<template>
  <div ref="targetRef" :class="ns.b()">
    <div ref="containerRef">
      <slot />
    </div>
    hi
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useNamespace } from 'element-plus'
import { resizableProps } from './resizable'
import { useResizable } from './hooks'

defineOptions({
  name: 'ElResizable',
})
const props = defineProps(resizableProps)
const ns = useNamespace('resizable')

const targetRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

useResizable(targetRef, containerRef, props)

console.log(1111, props)
</script>
