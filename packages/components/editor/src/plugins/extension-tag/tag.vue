<template>
  <NodeViewWrapper class="tiptap-extension-tag">
    <el-tag
      :id="node.attrs.id"
      type="primary"
      size="small"
      :class="node.attrs.class"
      v-bind="node.attrs.props"
    >
      {{ node.attrs.props.text }}
    </el-tag>
  </NodeViewWrapper>
</template>

<script lang="ts" setup>
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'
import { ElTag } from 'element-plus'

defineProps(nodeViewProps)
</script>
