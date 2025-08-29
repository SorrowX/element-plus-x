<template>
  <pre>{{ value }}</pre>
  <el-tabs-select-panel
    v-model="value"
    v-model:tab="tab"
    :multiple="false"
    :tabs="tabs"
    prefix-label=""
    style="max-width: 320px"
    :tabs-props="{ stretch: true }"
  >
    <template #empty>
      <div style="color: #f60; padding-top: 60px">空空如也</div>
    </template>
  </el-tabs-select-panel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('1')
const value = ref('Output1')

const tabs = ref([
  {
    title: '分组展示',
    id: '1',
    type: 'group',
    options: [
      // {
      //   label: '插件',
      //   children: [
      //     {
      //       label: 'Output1',
      //       value: 'Output1',
      //       children: [
      //         {
      //           label: 'Output1-1',
      //           value: 'Output1-1',
      //         },
      //       ],
      //     },
      //     {
      //       label: 'Output2',
      //       value: 'Output2',
      //     },
      //   ],
      // },
      // {
      //   label: '大模型',
      //   children: [
      //     {
      //       label: 'model1',
      //       value: 'model1',
      //       children: [
      //         {
      //           label: 'model1-1',
      //           value: 'model1-1',
      //           children: [
      //             {
      //               label: 'model1-1-1',
      //               value: 'model1-1-1',
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       label: 'model2',
      //       value: 'model2',
      //     },
      //   ],
      // },
    ],
  },
  {
    title: '列表展示',
    id: '2',
    type: 'option',
    options: [
      // {
      //   label: '当前北京时间',
      //   value: 'time',
      // },
      // {
      //   label: 'SOP开始时间',
      //   value: 'sop',
      // },
    ],
  },
])
</script>
