<template>
  <el-input
    v-model="filterText"
    style="margin-bottom: 8px"
    placeholder="Filter keyword"
  />

  <el-line-tree style="max-width: 600px" :data="data" default-expand-all />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const filterText = ref('')

const getData = () => {
  return [
    {
      id: 1,
      label: 'Level one 1',
      children: [
        {
          id: 4,
          label: 'Level two 1-1',
          children: [
            {
              id: 9,
              label: 'Level three 1-1-1',
            },
            {
              id: 10,
              label: 'Level three 1-1-2',
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: 'Level one 2',
      children: [
        {
          id: 5,
          label: 'Level two 2-1',
        },
        {
          id: 6,
          label: 'Level two 2-2',
        },
      ],
    },
    {
      id: 3,
      label: 'Level one 3',
      children: [
        {
          id: 7,
          label: 'Level two 3-1',
        },
        {
          id: 8,
          label: 'Level two 3-2',
        },
      ],
    },
  ]
}

const filter = (data: any, keyword: string) => {
  if (!keyword) return data

  return data.reduce((acc: any, node: any) => {
    const filteredChildren = node.children ? filter(node.children, keyword) : []

    const isMatched = node.label.includes(keyword)

    if (isMatched || filteredChildren.length > 0) {
      acc.push({
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : undefined,
      })
    }
    return acc
  }, [])
}

watch(filterText, (val) => {
  data.value = filter(getData(), val)
})

const data = ref(getData())
</script>
