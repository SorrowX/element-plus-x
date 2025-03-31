<template>
  <el-editable :model-value="value" trigger="click">
    <el-input v-model="value" />
  </el-editable>
</template>

<script setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'
const value = ref('单击我试试')
</script>
