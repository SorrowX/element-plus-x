<template>
  <el-editor
    v-model="value"
    style="width: 320px"
    prefix="/"
    palaceholder="请输入/试试"
  >
    <!--完全自定义-->
    <template #content="{ hide }">
      <div style="list-style: none; margin: 0px; padding: 0">
        <p>你可以手动调用 hide 方法关闭弹窗</p>
        <p>这里你可以完全自定义UI</p>
        <el-button @click="hide">hide 关闭</el-button>
      </div>
    </template>
  </el-editor>
</template>

<script setup>
import { ref } from 'vue'
const value = ref(`/`)
const options = ref([{ label: 'label', id: 'id' }])
</script>
