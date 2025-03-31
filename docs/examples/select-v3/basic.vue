<template>
  <p>{{ value }}</p>
  <el-select-v3 v-model="value" :options="options" style="width: 240px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = '我是一个很长的数据是一个很长的数据一个很长的数据'
const text1 = '数据'

const value = ref()
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `Row${idx + 1}-${Math.random() > 0.5 ? text : text1}`,
}))
</script>

<style scoped>
.example-showcase .el-select-v2 {
  margin-right: 20px;
}
</style>
