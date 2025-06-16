<template>
  <el-tree-v2 :class="ns.b()" :data="data" :props="defaultProps">
    <template #default="{ node, data }">
      <div :class="nodeNs.e('custom')" :level="node.level">
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
          <slot>
            <span>{{ data.label }}</span>
          </slot>
        </div>
      </div>
    </template>
  </el-tree-v2>
</template>

<script lang="ts" setup>
import { useNamespace } from 'element-plus'
import * as IconsVue from '@element-plus/components/icons-vue'
import { lineTreeEmits, lineTreeProps } from './line-tree'
import { ElTreeV2 } from './tree'
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

interface Tree {
  label: string
  children?: Tree[]
}

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
            children: [
              {
                label: 'aaaa',
                children: [
                  {
                    label: 'bbbb',
                  },
                ],
              },
              {
                label: 'ccccc',
                children: [
                  {
                    label: 'dddd',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Level two 1-2',
      },
    ],
  },
  // {
  //   label: 'Level one 2',
  //   children: [
  //     {
  //       label: 'Level two 2-1',
  //       children: [
  //         {
  //           label: 'Level three 2-1-1',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Level two 2-2',
  //       children: [
  //         {
  //           label: 'Level three 2-2-1',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: 'Level one 3',
  //   children: [
  //     {
  //       label: 'Level two 3-1',
  //       children: [
  //         {
  //           label: 'Level three 3-1-1',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Level two 3-2',
  //       children: [
  //         {
  //           label: 'Level three 3-2-1',
  //         },
  //       ],
  //     },
  //   ],
  // },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}
</script>
