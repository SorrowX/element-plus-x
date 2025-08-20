<template>
  <el-editor v-model="value" :options="options" style="width: 320px">
    <!--完全自定义-->
    <template #content="{ hide }">
      <div style="list-style: none; margin: 0px; padding: 0">
        <p>你可以手动调用 hide 方法关闭弹窗</p>
        <p>这里你可以完全自定义UI</p>
        <el-button @click="hide">关闭</el-button>
      </div>
    </template>
  </el-editor>
</template>

<script setup>
import { ref } from 'vue'
const value = ref(`@`)
const options = ref(
  Array.from({ length: 40 }).map((_, index) => {
    return {
      label: `Summer_${index}`,
      id: `xzw_${index}`,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    }
  })
)
</script>
