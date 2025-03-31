<template>
  <component :is="tag" :style="{ position }" :class="ns.b()" v-bind="$attrs">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { useNamespace } from 'element-plus'
import { affixBottomProps } from './affix-bottom'
const ns = useNamespace('affix-bottom')

defineOptions({
  name: 'ElAffixBottom',
})

defineProps(affixBottomProps)
</script>
