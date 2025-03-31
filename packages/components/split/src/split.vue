<template>
  <div
    ref="wrapper"
    :class="[
      ns.b(),
      ns.m(moving ? 'moving' : ''),
      ns.m(vertical ? 'vertical' : 'horizontal'),
      $attrs.class,
    ]"
    :style="{ ...($attrs.style ?? {}) }"
  >
    <div
      :class="[ns.e('panel'), nsPanel.m(vertical ? 'top' : 'left')]"
      :style="leftPaneStyle"
    >
      <slot name="left" />
    </div>
    <div
      :class="[ns.e('panel'), nsPanel.m(vertical ? 'bottom' : 'right')]"
      :style="rightPaneStyle"
    >
      <slot name="right" />
    </div>
    <div :class="ns.e('trigger')" :style="triggerStyle">
      <div ref="handler" :class="ns.e('handler')">
        <slot name="handler">
          <span :class="ns.e('pointer')" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useNamespace } from 'element-plus'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import { splitEmits, splitProps } from './split'
import { useMoving } from './hooks'
import type { MovingState } from './hooks'

const ns = useNamespace('split')
const nsPanel = useNamespace('split__panel')

defineOptions({
  name: 'ElSplit',
})

const props = defineProps(splitProps)
const emit = defineEmits(splitEmits)

const wrapper = ref<HTMLElement>()
const currentValue = ref(props.modelValue)

const offset = computed(() => {
  return props.vertical ? 'offsetHeight' : 'offsetWidth'
})
const position = computed<['top', 'bottom'] | ['left', 'right']>(() => {
  return props.vertical ? ['top', 'bottom'] : ['left', 'right']
})

const outer = computed(() => wrapper.value?.[offset.value] ?? 0)
const min = computed(() =>
  props.min <= 1 ? props.min : props.min / outer.value
)
const max = computed(() =>
  props.max <= 1 ? props.max : props.max / outer.value
)

function handleChange(value: number) {
  if (value.toFixed(5) !== currentValue.value.toFixed(5)) {
    currentValue.value = value

    emit(CHANGE_EVENT, value)
    emit(UPDATE_MODEL_EVENT, value)
  }
}

const { target: handler, moving } = useMoving({
  lazy: true,
  capture: false,
  onStart: (state: MovingState, event: PointerEvent) => {
    if (!wrapper.value || event.button > 0) {
      return false
    }
    state.start = currentValue.value * outer.value
    state.target = currentValue.value
  },
  onMove: (state: MovingState) => {
    const delta = props.vertical ? state.deltaY : state.deltaX
    const start = state.start as number
    const value = Math.min(
      Math.max(min.value, (start + delta) / outer.value),
      max.value
    )
    handleChange(value)
  },
})

const leftPaneStyle = computed(() => {
  return {
    [position.value[1]]: `${(1 - currentValue.value) * 100}%`,
  }
})
const rightPaneStyle = computed(() => {
  return {
    [position.value[0]]: `${currentValue.value * 100}%`,
  }
})
const triggerStyle = computed(() => {
  return {
    [position.value[0]]: `calc(${
      currentValue.value * 100
    }% - var(${ns.cssVarName('split-handler-size')}) * 0.5)`,
  }
})
</script>
