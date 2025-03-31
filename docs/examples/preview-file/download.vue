<template>
  <el-button @click="handleClick">文本下载</el-button>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { download } from 'element-plus-x'
import type { DownloadOptions } from 'element-plus-x'

const handleClick = () => {
  download({
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    fileName: 'text.txt',
  } as DownloadOptions).catch((err) => {
    console.log(err)
    ElMessage.error('下载异常')
  })
}
</script>
