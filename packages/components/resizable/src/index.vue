<template>
  <div
    ref="targetRef"
    :class="[ns.b(), $attrs.class]"
    :style="[targetStyle, $attrs.style as CSSProperties]"
    @pointerdown.stop.prevent="handleInnerTargetDown($event)"
  >
    <div ref="containerRef" :class="ns.e('content')" :style="containerStyle">
      <slot v-bind="{ handleTargetDown }" />
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
import type { CSSProperties } from 'vue'
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
  move,
  stickDown,
  stickUp,
  targetDown,
  targetUp,
  targetStyle,
  containerStyle,
} = useResizable(targetRef, containerRef, props, emit)

const createStickMove = (stick: IStick) => {
  return (evt: PointerEvent) => {
    move(evt, 'stickMove', stick)
  }
}

const handleStickDown = (evt: PointerEvent, stick: IStick) => {
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
