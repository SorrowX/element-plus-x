<template>
  <el-preview-file :file-list="fileList">
    <template #default="{ meta }">
      <el-renderer :renderer="() => renderItem(meta)" />
    </template>
  </el-preview-file>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { ElIcon } from 'element-plus'

const fileList = [
  {
    name: 'excel-file.xlsx',
    size: 111111,
  },
  {
    name: 'word-file.docx',
    size: 222222,
  },
  {
    name: 'image-file.png',
    size: 333333,
  },
  {
    name: 'pdf-file.pdf',
    size: 444444,
  },
  {
    name: 'ppt-file.pptx',
    size: 555555,
  },
  {
    name: 'zip-file.zip',
    size: 888888,
  },
  {
    name: 'markdown-file.md',
    size: 999999,
  },
  {
    name: 'yarn.lock',
    size: 999999,
  },
]

const renderItem = (meta) => {
  return h(
    ElIcon,
    {
      size: 48,
      color: meta.iconColor,
    },
    {
      default: () => h(meta.icon),
    }
  )
}
</script>
