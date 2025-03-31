<template>
  <el-editable :model-value="value" trigger="icon" style="width: 320px">
    <el-input v-model="value" />
  </el-editable>
</template>

<script setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'
const value = ref('徐志伟')
</script>
