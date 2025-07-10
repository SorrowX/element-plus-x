<template>
  <div
    ref="targetRef"
    :class="[ns.b(), $attrs.class]"
    :style="calcTargetStyle"
    @pointerdown.stop.prevent="handleInnerTargetDown($event)"
  >
    <div ref="containerRef" :class="ns.e('content')" :style="containerStyle">
      <slot v-bind="{ handleTargetDown }" />
    </div>
    <template v-if="isResizable">
      <div
        v-for="(stick, index) in sticks"
        :key="index"
        :class="[ns.e('stick'), ns.m(`stick-${stick}`)]"
        @pointerdown.stop.prevent="(evt) => handleStickDown(evt, stick)"
      >
        <el-renderer :renderer="() => renderStick(stick)" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useAttrs, useSlots } from 'vue'
import { useNamespace } from 'element-plus'
import { ElRenderer } from '@element-plus/components/renderer/index'
import { resizableEmits, resizableProps } from './resizable'
import { useResizable } from './hooks'
import type { IStick } from './types'

defineOptions({
  name: 'ElResizable',
  inheritAttrs: false,
})
const props = defineProps(resizableProps)
const emit = defineEmits(resizableEmits)
const slots = useSlots()
const attrs = useAttrs()
const ns = useNamespace('resizable')

const targetRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const {
  move,
  stickDown,
  stickUp,
  targetDown,
  targetUp,
  targetStyle,
  containerStyle,
} = useResizable(targetRef, containerRef, props, emit)

const calcTargetStyle = computed(() => {
  return {
    ...targetStyle.value,
    ...(attrs.style as any),
  }
})

const createStickMove = (stick: IStick) => {
  return (evt: PointerEvent) => {
    move(evt, 'stickMove', stick)
  }
}

const handleStickDown = (evt: PointerEvent, stick: IStick) => {
  if (!props.isResizable) return

  stickDown(evt, stick)

  const handleStickMove = createStickMove(stick)

  const handleStickUp = () => {
    document.removeEventListener('pointermove', handleStickMove)
    document.removeEventListener('pointerup', handleStickUp)
    stickUp(evt)
  }

  document.addEventListener('pointermove', handleStickMove)
  document.addEventListener('pointerup', handleStickUp)
}

const handleBaseTargetDown = (evt: PointerEvent) => {
  if (!props.isDraggable) return

  targetDown(evt)

  const handleTargetMove = (evt: PointerEvent) => {
    move(evt, 'targetMove')
  }

  const handleTargetUp = (evt: PointerEvent) => {
    document.removeEventListener('pointermove', handleTargetMove)
    document.removeEventListener('pointerup', handleTargetUp)
    targetUp(evt)
  }

  document.addEventListener('pointermove', handleTargetMove)
  document.addEventListener('pointerup', handleTargetUp)
}

const handleInnerTargetDown = (evt: PointerEvent) => {
  if (props.isCustomDraggable) return
  handleBaseTargetDown(evt)
}
const handleTargetDown = (evt: PointerEvent) => handleBaseTargetDown(evt)

const renderStick = (stick: IStick) => slots[stick]?.()
</script>
