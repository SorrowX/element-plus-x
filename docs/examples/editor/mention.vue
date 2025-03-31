<template>
  <el-editor
    v-model="value"
    style="width: 320px; margin-bottom: 24px"
    placeholder="Please input"
    :options="options"
  />

  <el-editor
    v-model="value2"
    style="width: 320px"
    prefix="/"
    placeholder="输入 / 试试"
    :options="getList"
  />
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

const value2 = ref(``)
const getList = ({ query }) => {
  // 这里应该使用防抖处理远程搜索的结果，这里只做简单处理
  return Promise.resolve(
    Array.from({ length: 40 }).map((_, index) => {
      return {
        label: `Summer_${index}`,
        id: `xzw_${index}`,
      }
    })
  )
}
</script>
