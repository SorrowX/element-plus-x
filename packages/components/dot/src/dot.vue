<template>
  <div :class="[ns.b(), ns.m(type), sizeKls]">
    <span :class="ns.e('spot')" :style="spotStyle" />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useNamespace } from 'element-plus'
import { addUnit, isUndefined } from '@element-plus/utils'
import { dotProps } from './dot'

defineOptions({
  name: 'ElDot',
})
const props = defineProps(dotProps)

const ns = useNamespace('dot')
const isPresetsSize = computed(() =>
  ['large', 'default', 'small'].includes(props.size ?? '')
)
const spotStyle = computed(() => {
  const size =
    isUndefined(props.size) || isPresetsSize.value ? '' : addUnit(props.size)
  return {
    width: size,
    height: size,
    backgroundColor: props.color,
  }
})
const sizeKls = computed(() => (isPresetsSize.value ? ns.m(props.size) : ''))
</script>
