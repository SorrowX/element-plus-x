<template>
  <el-radio-group v-model="value">
    <el-radio value="horizontal" size="large">horizontal</el-radio>
    <el-radio value="vertical" size="large">vertical</el-radio>
  </el-radio-group>

  <el-flex :vertical="value === 'vertical'">
    <div class="flex-content ep-bg-purple" />
    <div class="flex-content ep-bg-purple-light" />
    <div class="flex-content ep-bg-purple" />
    <div class="flex-content ep-bg-purple-light" />
  </el-flex>
</template>

<script setup>
import { ref } from 'vue'
const value = ref('horizontal')
</script>

<style scoped lang="scss">
.flex-content {
  width: 25%;
  min-height: 36px;
  border-radius: 4px;
  margin-bottom: 12px;
}
</style>
