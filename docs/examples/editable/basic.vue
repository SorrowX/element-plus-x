<template>
  <el-editable :model-value="value" @change="handleChange">
    <el-input v-model="value" />
  </el-editable>
</template>

<script setup>
import { ref } from 'vue'
import { ElInput } from 'element-plus'
const value = ref('双击我试试')
const handleChange = (bool) => {
  console.log('是否编辑状态:', bool)
}
</script>
