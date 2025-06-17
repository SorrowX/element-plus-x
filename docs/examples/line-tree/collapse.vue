<template>
  <el-line-tree
    style="max-width: 600px"
    :data="options"
    line-radius="4px"
    collapse-width="14px"
    @node-click="handleNodeClick"
  >
    <template #collapse="{ node }">
      <el-icon
        size="14"
        :class="node.isLeaf ? 'is-leaf' : ''"
        color="var(--el-tree-expand-icon-color)"
      >
        <component :is="node.expanded ? CaretBottom : CaretRight" />
      </el-icon>
    </template>
  </el-line-tree>
</template>

<script lang="ts" setup>
import { CaretBottom, CaretRight } from '@element-plus/icons-vue'

interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const options: Tree[] = [
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
                label: 'Level four 1-1-1-1',
                children: [
                  {
                    label: 'Level five 1-1-1-1-1',
                  },
                ],
              },
              {
                label: 'Level four 1-1-1-1',
                children: [
                  {
                    label: 'Level five 1-1-1-1-1',
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
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]
</script>
