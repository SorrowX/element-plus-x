<template>
  <div :class="ns.b()">
    <div v-if="hasPoster" :class="ns.e('poster')">
      <slot name="poster">
        <img :src="poster" v-bind="posterProps" />
      </slot>
    </div>

    <slot name="duration" v-bind="{ formatDuration }">
      <span v-if="hasDuration" :class="ns.e('duration')">
        {{ formatDuration }}
      </span>
    </slot>

    <div v-if="!readonly" :class="ns.e('player')">
      <video
        ref="videoRef"
        controls
        :class="ns.e('video')"
        :src="src"
        :hidden="hasPoster"
        @ended="handlePause"
        @pause="handlePause"
        @play="handlePlay"
      >
        <slot />
      </video>
    </div>

    <div v-if="hasPoster" :class="ns.e('action')" @click="handleClick">
      <slot name="play-icon" v-bind="{ handleClick }">
        <el-icon
          :class="ns.e('btn')"
          size="42"
          color="rgba(0,0,0,0.6)"
          v-bind="iconProps"
        >
          <VideoPlayer />
        </el-icon>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ElIcon, useNamespace } from 'element-plus'
import { formatTime, isNumber } from '@element-plus/utils'
import * as IconsVue from '@element-plus/components/icons-vue/index'
import { videoProps } from './video'

defineOptions({
  name: 'ElVideo',
})

const { VideoPlayer } = IconsVue
const props = defineProps(videoProps)
const ns = useNamespace('video')

const isPlayed = ref(false)
const paused = ref(true)
const videoRef = ref<HTMLVideoElement | null>(null)

const setPaused = (bool: boolean) => (paused.value = bool)
const setIsPlayed = (bool: boolean) => (isPlayed.value = bool)

const hasPoster = computed(() => !isPlayed.value && !!props.poster)
const hasDuration = computed(() => hasPoster.value && !!props.duration)

const formatDuration = computed(() =>
  isNumber(props.duration) ? formatTime(props.duration) : props.duration
)

const handlePlay = () => setPaused(false)

const handlePause = () => setPaused(true)

const handleClick = (e: any) => {
  if (props.readonly) {
    props.onClick?.(e)
    return
  }

  setIsPlayed(true)
  const video = videoRef.value

  if (video) {
    if (video.ended || video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }
  props.onClick?.(e)
}

defineExpose({
  video: videoRef,
})
</script>
