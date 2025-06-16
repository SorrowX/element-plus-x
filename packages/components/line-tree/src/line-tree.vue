<template>
  <el-tree :class="ns.b()">
    <template #default="{ node, data }">
      <div :class="nodeNs.e('custom')" :level="node.level" @click.stop>
        <div :class="nodeNs.e('custom-collapse')">
          <el-icon
            :class="[
              nodeNs.is('leaf', node.isLeaf),
              {
                expanded: !node.isLeaf,
              },
            ]"
            size="16"
            @click.stop="handleExpandIconClick(node)"
          >
            <component :is="node.expanded ? Expand : PutAway" />
          </el-icon>
        </div>
        <div :class="nodeNs.e('custom-content')">
          <slot v-bind="{ node, data }">
            <span>{{ data.label }}</span>
          </slot>
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { useNamespace } from 'element-plus'
import * as IconsVue from '@element-plus/components/icons-vue'
import { lineTreeEmits, lineTreeProps } from './line-tree'
const { Expand, PutAway } = IconsVue

defineOptions({
  name: 'ElLineTree',
})
const ns = useNamespace('line-tree')
const nodeNs = useNamespace('line-tree-node')

defineProps(lineTreeProps)
defineEmits(lineTreeEmits)

const handleExpandIconClick = (node: any) => {
  if (node.isLeaf) return
  if (node.expanded) {
    node.collapse()
  } else {
    node.expand(() => {})
  }
}
</script>
