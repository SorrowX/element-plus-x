<template>
  <NodeViewWrapper class="tiptap-extension-video">
    <video v-bind="attrs" />
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

const props = defineProps(nodeViewProps)

const attrs = computed(() => {
  return {
    ...props.node.attrs,
  }
})
</script>
