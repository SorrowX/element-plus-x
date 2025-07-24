<template>
  <!-- {{ value }} -->
  <el-tabs-select
    v-model="value"
    :tabs="tabs"
    style="max-width: 260px"
    :tabs-props="{ stretch: true }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('tag2')

const tabs = ref([
  {
    title: '节点',
    id: '1',
    type: 'group',
    options: [
      {
        label: '插件',
        children: [
          {
            label: 'Output1',
            value: 'Output1',
            children: [
              {
                label: 'Output1-1',
                value: 'Output1-1',
              },
            ],
          },
          {
            label: 'Output2',
            value: 'Output2',
          },
        ],
      },
      {
        label: '大模型',
        children: [
          {
            label: 'model1',
            value: 'model1',
            children: [
              {
                label: 'model1-1',
                value: 'model1-1',
                children: [
                  {
                    label: 'model1-1-1',
                    value: 'model1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: 'model2',
            value: 'model2',
          },
        ],
      },
    ],
  },
  {
    title: '通用',
    id: '2',
    type: 'option',
    options: [
      {
        label: '当前北京时间',
        value: 'time',
      },
      {
        label: 'SOP开始时间',
        value: 'sop',
      },
    ],
  },
  {
    title: '客户信息',
    id: '3',
    type: 'option',
    options: [
      {
        label: 'Vip客户',
        value: 'vip',
        children: [
          {
            label: '客户1',
            value: 'vip-customer1',
          },
          {
            label: '客户2',
            value: 'vip-customer2',
          },
        ],
      },
      {
        label: '普通客户',
        value: 'general',
        children: [
          {
            label: '普通-客户1',
            value: 'general-customer1',
          },
          {
            label: '普通-客户2',
            value: 'general-customer2',
          },
        ],
      },
    ],
  },
  {
    title: '客户标签',
    id: '4',
    type: 'option',
    options: [],
  },
])

// 模拟异步接口请求数据更新数据源
setTimeout(() => {
  tabs.value[3].options = [
    {
      label: '标签1',
      value: 'tag1',
    },
    {
      label: '标签2',
      value: 'tag2',
    },
  ]
}, 2000)
</script>
