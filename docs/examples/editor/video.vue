<template>
  <div style="margin-bottom: 12px">
    <el-button size="small" @click="insertVideo">插入视频</el-button>
  </div>

  <el-editor
    ref="editor"
    v-model="html"
    disable-enter-emit
    style="width: 500px; min-height: 220px; max-height: 500px; overflow: auto"
  />
</template>

<script setup>
import { ref } from 'vue'

const html = ref()
const editor = ref(null)

const insertVideo = () =>
  editor.value.setVideo({
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    width: 320,
  })
</script>
