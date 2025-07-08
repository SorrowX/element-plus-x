<template>
  <div
    ref="targetRef"
    :class="[ns.b(), contentClass]"
    :style="positionStyle"
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
        ns.e('stick') + '-' + stick,
        isResizable ? '' : 'not-resizable',
      ]"
      :style="vdrStick(stick)"
      @pointerdown.stop.prevent="(ev) => handleStickDown(ev, stick)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from 'element-plus'
import { resizableEmits, resizableProps } from './resizable'
import { useResizable } from './hooks'
import type { IStick } from './types'

defineOptions({
  name: 'ElResizable',
  inheritAttrs: false,
})
const props = defineProps(resizableProps)
const emit = defineEmits(resizableEmits)
const ns = useNamespace('resizable')

const targetRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const {
  positionStyle,
  sizeStyle,
  vdrStick,
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
</script>
