<template>
  <el-editor
    v-model="value"
    style="width: 320px"
    placeholder="Please input"
    @enter="handleEnter"
  />
  <pre>{{ value }}</pre>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const value = ref()

const handleEnter = (values) => {
  console.log(values)
  ElMessage('回车做点什么')
}
</script>
