<template>
  <div
    ref="targetRef"
    :class="[ns.b(), contentClass]"
    :style="positionStyle"
    @pointerdown="handleBodyDown($event)"
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
  bodyDown,
  bodyUp,
} = useResizable(targetRef, containerRef, props, emit)

const createStickMove = (stick: string) => {
  return (ev: any) => {
    console.log('stick-move')
    move(ev, 'stickDrag', stick)
  }
}

const handleStickDown = (ev: any, stick: string) => {
  console.log('stick-start')
  stickDown(stick, ev)

  const handleStickMove = createStickMove(stick)

  const handleStickUp = () => {
    console.log('stick-end')
    document.removeEventListener('pointermove', handleStickMove)
    document.removeEventListener('pointerup', handleStickUp)
    stickUp()
  }

  document.addEventListener('pointermove', handleStickMove)
  document.addEventListener('pointerup', handleStickUp)
}

const handleBodyDown = (ev: any) => {
  console.log('start1')
  bodyDown(ev)

  const handleBodyMove = (ev: any) => {
    console.log('move1')
    move(ev, 'bodyDrag')
  }

  const handleBodyUp = () => {
    console.log('end1')
    document.removeEventListener('pointermove', handleBodyMove)
    document.removeEventListener('pointerup', handleBodyUp)
    bodyUp()
  }

  document.addEventListener('pointermove', handleBodyMove)
  document.addEventListener('pointerup', handleBodyUp)
}
</script>
