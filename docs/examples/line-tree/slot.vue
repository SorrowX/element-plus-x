<template>
  <el-line-tree
    style="max-width: 600px"
    :data="options"
    @node-click="handleNodeClick"
  >
    <template #default="{ data }">
      <!-- <div>
        <p>{{ data.label }}</p>
        <div>hi</div>
      </div> -->
      <el-input v-model="data.value" style="margin: 4px 0" />
    </template>
  </el-line-tree>
</template>

<script lang="ts" setup>
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
