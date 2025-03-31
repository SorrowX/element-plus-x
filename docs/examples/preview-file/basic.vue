<template>
  <el-preview-file :file-list="fileList" />
</template>

<script lang="ts" setup>
import type { UploadUserFile } from 'element-plus'

const fileList: UploadUserFile[] = [
  {
    name: 'excel-file.xlsx',
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
    name: 'video-file.mp4',
    size: 666666,
  },
  {
    name: 'audio-file.mp3',
    size: 777777,
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
</script>
