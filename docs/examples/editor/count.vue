<template>
  <el-editor
    v-model="value"
    style="width: 400px; min-height: 60px"
    placeholder="Please input"
    maxlength="50"
    @enter="handleEnter"
  />
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const value = ref()

setTimeout(() => {
  value.value = '你好啊，Summer'
}, 1000)

const handleEnter = (values) => {
  console.log(values)
  ElMessage('回车做点什么')
}
</script>
