<template>
  <el-editor
    v-model="value"
    class="editor"
    resize
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

<style lang="scss" scoped>
.editor {
  max-width: 450px;
  min-height: 80px;
  max-height: 250px;
}
</style>
