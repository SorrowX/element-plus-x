<template>
  <pre>{{ value }}</pre>
  <el-tabs-select-panel
    v-model="value"
    v-model:tab="tab"
    :multiple="false"
    :tabs="tabs"
    prefix-label=""
    style="max-width: 380px"
    :loading="loading"
    :remote-method="remoteMethod"
    :tabs-props="{ stretch: true }"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tab = ref('1')

const value = ref()
const loading = ref(false)

const remoteMethod = (query: string, currentTabId: string) => {
  if (loading.value) return
  // 自定义业务逻辑，这里只是简单的赋值操作
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      tabs.value.find((item) => item.id === currentTabId)!.options = [
        {
          label: `${query}1`,
          value: `${query}1`,
        },
        {
          label: `${query}2`,
          value: `${query}2`,
        },
      ]
    }, 200)
  }
}

const tabs = ref([
  {
    title: '列表展示',
    id: '1',
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
    title: '树形展示',
    id: '2',
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
])
</script>
