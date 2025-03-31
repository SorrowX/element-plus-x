<template>
  <el-emoji v-model="value" @click-tab="handleTab">
    <template #trigger>
      <el-button text>文字表情</el-button>
    </template>
  </el-emoji>

  <el-emoji v-model="value2" type="image">
    <template #trigger>
      <el-button text>图片表情</el-button>
    </template>
  </el-emoji>

  <pre>{{ value }}</pre>
  <pre style="font-size: 24px">{{ value2 }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref()
const value2 = ref()

const handleTab = (tab: string) => {
  console.log(tab)
}
</script>
