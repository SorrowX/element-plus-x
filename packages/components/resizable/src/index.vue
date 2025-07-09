<template>
  <div
    ref="targetRef"
    :class="[ns.b(), $attrs.class]"
    :style="[positionStyle]"
    @pointerdown="handleTargetDown($event)"
  >
    <div ref="containerRef" :class="ns.e('content')" :style="sizeStyle">
      <slot />
    </div>
    <div
      v-for="(stick, index) in sticks"
      :key="index"
      :class="[
        ns.e('stick'),
        ns.m(`stick-${stick}`),
        isResizable ? '' : 'not-resizable',
      ]"
      @pointerdown.stop.prevent="(ev) => handleStickDown(ev, stick)"
    >
      <el-renderer :renderer="() => renderStick(stick)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, useSlots } from 'vue'
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
const ns = useNamespace('resizable')

const targetRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const {
  positionStyle,
  sizeStyle,
  move,
  stickDown,
  stickUp,
  targetDown,
  targetUp,
} = useResizable(targetRef, containerRef, props, emit)

const createStickMove = (stick: IStick) => {
  return (evt: PointerEvent) => {
    // console.log('stick-move')
    move(evt, 'stickMove', stick)
  }
}

const handleStickDown = (evt: PointerEvent, stick: IStick) => {
  // console.log('stick-start')
  stickDown(evt, stick)

  const handleStickMove = createStickMove(stick)

  const handleStickUp = () => {
    // console.log('stick-end')
    document.removeEventListener('pointermove', handleStickMove)
    document.removeEventListener('pointerup', handleStickUp)
    stickUp()
  }

  document.addEventListener('pointermove', handleStickMove)
  document.addEventListener('pointerup', handleStickUp)
}

const handleTargetDown = (evt: PointerEvent) => {
  // console.log('start1')
  targetDown(evt)

  const handleTargetMove = (evt: PointerEvent) => {
    // console.log('move1')
    move(evt, 'targetMove')
  }

  const handleTargetUp = () => {
    // console.log('end1')
    document.removeEventListener('pointermove', handleTargetMove)
    document.removeEventListener('pointerup', handleTargetUp)
    targetUp()
  }

  document.addEventListener('pointermove', handleTargetMove)
  document.addEventListener('pointerup', handleTargetUp)
}

const renderStick = (stick: IStick) => slots[stick]?.()
</script>
