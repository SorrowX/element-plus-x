<template>
  <el-tree :class="ns.b()" :style="treeStyle" v-bind="$attrs">
    <template #default="{ node, data }">
      <div
        :class="[ns.e('custom'), showContentLine ? ns.m('content-line') : '']"
        :level="node.level"
      >
        <div
          :class="ns.e('custom-collapse')"
          @click.stop="handleExpandIconClick(node)"
        >
          <slot name="collapse" v-bind="{ node, data }">
            <el-icon
              :class="[
                ns.is('leaf', node.isLeaf),
                {
                  expanded: !node.isLeaf,
                },
              ]"
              size="16"
            >
              <component :is="node.expanded ? Expand : PutAway" />
            </el-icon>
          </slot>
        </div>
        <div :class="ns.e('custom-content')">
          <slot v-bind="{ node, data }">
            <span>{{ data.label }}</span>
          </slot>
        </div>
      </div>
    </template>
    <template #empty>
      <slot name="empty" />
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElIcon, ElTree, useNamespace } from 'element-plus'
import * as IconsVue from '@element-plus/components/icons-vue'
import { lineTreeEmits, lineTreeProps } from './line-tree'
const { Expand, PutAway } = IconsVue

defineOptions({
  name: 'ElLineTree',
  inheritAttrs: false,
})
const ns = useNamespace('line-tree')

const props = defineProps(lineTreeProps)
defineEmits(lineTreeEmits)

const treeStyle = computed(() => {
  const prefix = `--${ns.namespace.value}`
  return {
    [`${prefix}-line-tree-line-color`]: props.lineColor,
    [`${prefix}-line-tree-line-radius`]: props.lineRadius,
    [`${prefix}-line-tree-collapse-width`]: props.collapseWidth,
  }
})

const handleExpandIconClick = (node: any) => {
  console.log(111, node)
  if (node.isLeaf) return
  node.expanded ? node.collapse() : node.expand()
}
</script>
