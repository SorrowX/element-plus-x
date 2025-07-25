<template>
  <!-- {{ value }} -->
  <el-tabs-select
    v-model="select"
    :tabs="tabs"
    style="width: 300px"
    :show-search="false"
  >
    <template #option="{ data }">
      <span style="color: #f60">{{ data.label }}-{{ data.value }}</span>
    </template>
  </el-tabs-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const select = ref()

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
    title: '列表展示',
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
    title: '树形展示',
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
])
</script>
