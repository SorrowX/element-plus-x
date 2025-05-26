<template>
  <component
    :is="teleported ? Teleport : 'div'"
    to="body"
    :disabled="!teleported"
  >
    <transition name="viewer-fade" appear>
      <div
        ref="wrapper"
        :tabindex="-1"
        :class="ns.e('wrapper')"
        :style="{ zIndex }"
      >
        <div :class="ns.e('mask')" @click.self="hideOnClickModal && hide()" />

        <!-- CLOSE -->
        <span :class="[ns.e('btn'), ns.e('close')]" @click="hide">
          <el-icon>
            <Close />
          </el-icon>
        </span>

        <!-- ARROW -->
        <template v-if="!isSingle">
          <span :class="arrowPrevKls" @click="prev">
            <el-icon>
              <ArrowLeft />
            </el-icon>
          </span>
          <span :class="arrowNextKls" @click="next">
            <el-icon>
              <ArrowRight />
            </el-icon>
          </span>
        </template>

        <!-- ACTIONS -->
        <div :class="[ns.e('btn'), ns.e('actions')]">
          <div :class="ns.e('actions__inner')">
            <el-icon @click="handleActions('zoomOut')">
              <ZoomOut />
            </el-icon>
            <el-icon @click="handleActions('zoomIn')">
              <ZoomIn />
            </el-icon>
            <i :class="ns.e('actions__divider')" />
            <el-icon @click="toggleMode">
              <component :is="mode.icon" />
            </el-icon>
            <i :class="ns.e('actions__divider')" />
            <el-icon @click="handleActions('anticlockwise')">
              <RefreshLeft />
            </el-icon>
            <el-icon @click="handleActions('clockwise')">
              <RefreshRight />
            </el-icon>
          </div>
        </div>

        <!-- CANVAS -->
        <div :class="ns.e('canvas')">
          <el-video
            :key="videoProps.src"
            :style="calcStyle"
            v-bind="videoProps"
          />
        </div>
        <slot />
      </div>
    </transition>
  </component>
</template>

<script lang="ts" setup>
import {
  Teleport,
  computed,
  effectScope,
  markRaw,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue'
import { useEventListener } from '@vueuse/core'
import { throttle } from 'lodash-unified'
import { ElIcon, useNamespace, useZIndex } from 'element-plus'
import ElVideo from '@element-plus/components/video/src/video.vue'
import { EVENT_CODE } from '@element-plus/constants'
import { keysOf } from '@element-plus/utils/element-plus'
import {
  ArrowLeft,
  ArrowRight,
  Close,
  FullScreen,
  RefreshLeft,
  RefreshRight,
  ScaleToOriginal,
  ZoomIn,
  ZoomOut,
} from '@element-plus/icons-vue'
import { videoViewerEmits, videoViewerProps } from './video-viewer'

import type { CSSProperties } from 'vue'
import type { VideoViewerAction, VideoViewerMode } from './video-viewer'

const modes: Record<'CONTAIN' | 'ORIGINAL', VideoViewerMode> = {
  CONTAIN: {
    name: 'contain',
    icon: markRaw(FullScreen),
  },
  ORIGINAL: {
    name: 'original',
    icon: markRaw(ScaleToOriginal),
  },
}

defineOptions({
  name: 'ElVideoViewer',
})

const props = defineProps(videoViewerProps)
const emit = defineEmits(videoViewerEmits)

const ns = useNamespace('video-viewer')
const { nextZIndex } = useZIndex()
const wrapper = ref<HTMLDivElement>()

const scopeEventListener = effectScope()

const activeIndex = ref(props.initialIndex)
const mode = shallowRef<VideoViewerMode>(modes.CONTAIN)
const transform = ref({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false,
})
const zIndex = ref(props.zIndex ?? nextZIndex())

const isSingle = computed(() => {
  const { urlList } = props
  return urlList.length <= 1
})

const isFirst = computed(() => {
  return activeIndex.value === 0
})

const isLast = computed(() => {
  return activeIndex.value === props.urlList.length - 1
})

const list = computed(() => {
  return props.urlList.map((url) => {
    if (typeof url === 'string') {
      return {
        src: url,
        poster: '',
      }
    } else {
      return url
    }
  })
})

const videoProps = computed(() => {
  return list.value[activeIndex.value]
})

const arrowPrevKls = computed(() => [
  ns.e('btn'),
  ns.e('prev'),
  ns.is('disabled', !props.infinite && isFirst.value),
])

const arrowNextKls = computed(() => [
  ns.e('btn'),
  ns.e('next'),
  ns.is('disabled', !props.infinite && isLast.value),
])

const calcStyle = computed(() => {
  const { scale, deg, offsetX, offsetY, enableTransition } = transform.value
  let translateX = offsetX / scale
  let translateY = offsetY / scale

  const radian = (deg * Math.PI) / 180
  const cosRadian = Math.cos(radian)
  const sinRadian = Math.sin(radian)
  translateX = translateX * cosRadian + translateY * sinRadian
  translateY = translateY * cosRadian - (offsetX / scale) * sinRadian

  const style: CSSProperties = {
    transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
    transition: enableTransition ? 'transform .3s' : '',
  }
  if (mode.value.name === modes.CONTAIN.name) {
    style.maxWidth = style.maxHeight = '100%'
  }
  return style
})

function hide() {
  unregisterEventListener()
  emit('close')
}

function registerEventListener() {
  const keydownHandler = throttle((e: KeyboardEvent) => {
    switch (e.code) {
      // ESC
      case EVENT_CODE.esc:
        props.closeOnPressEscape && hide()
        break
      // SPACE
      case EVENT_CODE.space:
        toggleMode()
        break
      // LEFT_ARROW
      case EVENT_CODE.left:
        prev()
        break
      // UP_ARROW
      case EVENT_CODE.up:
        handleActions('zoomIn')
        break
      // RIGHT_ARROW
      case EVENT_CODE.right:
        next()
        break
      // DOWN_ARROW
      case EVENT_CODE.down:
        handleActions('zoomOut')
        break
    }
  })
  const mousewheelHandler = throttle((e: WheelEvent) => {
    const delta = e.deltaY || e.deltaX
    handleActions(delta < 0 ? 'zoomIn' : 'zoomOut', {
      zoomRate: props.zoomRate,
      enableTransition: false,
    })
  })

  scopeEventListener.run(() => {
    useEventListener(document, 'keydown', keydownHandler)
    useEventListener(document, 'wheel', mousewheelHandler)
  })
}

function unregisterEventListener() {
  scopeEventListener.stop()
}

function reset() {
  transform.value = {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  }
}

function toggleMode() {
  const modeNames = keysOf(modes)
  const modeValues = Object.values(modes)
  const currentMode = mode.value.name
  const index = modeValues.findIndex((i) => i.name === currentMode)
  const nextIndex = (index + 1) % modeNames.length
  mode.value = modes[modeNames[nextIndex]]
  reset()
}

function setActiveItem(index: number) {
  const len = props.urlList.length
  activeIndex.value = (index + len) % len
}

function prev() {
  if (isFirst.value && !props.infinite) return
  setActiveItem(activeIndex.value - 1)
}

function next() {
  if (isLast.value && !props.infinite) return
  setActiveItem(activeIndex.value + 1)
}

function handleActions(action: VideoViewerAction, options = {}) {
  const { minScale, maxScale } = props
  const { zoomRate, rotateDeg, enableTransition } = {
    zoomRate: props.zoomRate,
    rotateDeg: 90,
    enableTransition: true,
    ...options,
  }
  switch (action) {
    case 'zoomOut':
      if (transform.value.scale > minScale) {
        transform.value.scale = Number.parseFloat(
          (transform.value.scale / zoomRate).toFixed(3)
        )
      }
      break
    case 'zoomIn':
      if (transform.value.scale < maxScale) {
        transform.value.scale = Number.parseFloat(
          (transform.value.scale * zoomRate).toFixed(3)
        )
      }
      break
    case 'clockwise':
      transform.value.deg += rotateDeg
      emit('rotate', transform.value.deg)
      break
    case 'anticlockwise':
      transform.value.deg -= rotateDeg
      emit('rotate', transform.value.deg)
      break
  }
  transform.value.enableTransition = enableTransition
}

watch(activeIndex, (val) => {
  reset()
  emit('switch', val)
})

onMounted(() => {
  registerEventListener()
})

defineExpose({
  /**
   * @description manually switch image
   */
  setActiveItem,
})
</script>
