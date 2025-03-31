<template>
  <div :class="[ns.b(), active ? 'active' : '']">
    <el-icon :size="size" v-bind="$attrs">
      <component :is="icon" />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { ElIcon, useNamespace } from 'element-plus'

const ns = useNamespace('editor-icon')

defineOptions({
  name: 'EditorIcon',
  inheritAttrs: false,
})

defineProps({
  icon: {
    type: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [Number, String],
    default: 18,
  },
})
</script>
