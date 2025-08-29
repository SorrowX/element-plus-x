<template>
  <el-tabs-select-panel
    v-model="value"
    v-model:tab="tab"
    :multiple="false"
    :tabs="tabs"
    prefix-label=""
    style="max-width: 320px"
    :tabs-props="{ stretch: true }"
  >
    <template #empty="{ hasSearchKey }">
      <div style="color: #f60; padding-top: 60px">
        {{ hasSearchKey ? '搜不到哦，少年郎' : '空空如也' }}
      </div>
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
    options: [],
  },
  {
    title: '列表展示',
    id: '2',
    type: 'option',
    options: [],
  },
])
</script>
