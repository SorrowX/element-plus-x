<template>
  <el-tree
    :class="ns.b()"
    :style="treeStyle"
    v-bind="$attrs"
    :expand-on-click-node="expandOnClickNode"
  >
    <template #default="{ node, data }">
      <div
        :class="nsNode.e('collapse')"
        @click.stop="handleExpandIconClick(node)"
      >
        <slot name="collapse" v-bind="{ node, data }">
          <el-icon
            :class="[
              nsNode.is('leaf', node.isLeaf),
              {
                expanded: !node.isLeaf,
              },
            ]"
            size="15"
            v-bind="iconProps"
          >
            <component :is="icon ? icon : node.expanded ? Expand : PutAway" />
          </el-icon>
        </slot>
      </div>

      <div
        :class="[
          nsNode.e('content'),
          showContentLine ? nsNode.m('content-line') : '',
        ]"
        :level="node.level"
      >
        <slot v-bind="{ node, data }">
          <span>{{ node.label }}</span>
        </slot>
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
const nsNode = useNamespace('line-tree-node')

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
  if (node.isLeaf || !props.expandOnClickNode) return
  node.expanded ? node.collapse() : node.expand()
}
</script>
