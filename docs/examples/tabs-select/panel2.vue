<template>
  <pre>{{ value }}</pre>
  <el-tabs-select-panel
    v-model="value"
    v-model:tab="tab"
    :multiple="true"
    :tabs="tabs"
    prefix-label=""
    style="max-width: 380px"
    value-key="id"
    :tabs-props="{ stretch: true }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tab = ref('4')

const value = ref([{ id: 'tag1' }])
// const value = ref({ id: 'tag1' })

const tabs = ref([
  {
    title: '分组展示',
    id: '1',
    type: 'group',
    options: [
      {
        label: '插件',
        children: [
          {
            label: 'Output1',
            id: 'Output1',
            children: [
              {
                label: 'Output1-1',
                id: 'Output1-1',
              },
            ],
          },
          {
            label: 'Output2',
            id: 'Output2',
          },
        ],
      },
      {
        label: '大模型',
        children: [
          {
            label: 'model1',
            id: 'model1',
            children: [
              {
                label: 'model1-1',
                id: 'model1-1',
                children: [
                  {
                    label: 'model1-1-1',
                    id: 'model1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: 'model2',
            id: 'model2',
          },
        ],
      },
    ],
  },
  {
    title: '列表展示',
    id: '2',
    type: 'option',
    options: [
      {
        label: '当前北京时间',
        id: 'time',
      },
      {
        label: 'SOP开始时间',
        id: 'sop',
      },
    ],
  },
  {
    title: '树形展示',
    id: '3',
    type: 'option',
    options: [
      {
        label: 'Vip客户',
        id: 'vip',
        children: [
          {
            label: '客户1',
            id: 'vip-customer1',
          },
          {
            label: '客户2',
            id: 'vip-customer2',
          },
        ],
      },
      {
        label: '普通客户',
        id: 'general',
        children: [
          {
            label: '普通-客户1',
            id: 'general-customer1',
          },
          {
            label: '普通-客户2',
            id: 'general-customer2',
          },
        ],
      },
    ],
  },
  {
    title: '异步数据',
    id: '4',
    type: 'option',
    options: [],
  },
])

// 模拟异步接口请求，更新数据源
setTimeout(() => {
  tabs.value[3].options = [
    {
      label: '标签1',
      id: 'tag1',
    },
    {
      label: '标签2',
      id: 'tag2',
    },
  ]
}, 1000)
</script>
