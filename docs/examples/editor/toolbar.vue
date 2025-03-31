<template>
  <div class="editor">
    <el-editor-toolbar
      v-if="editorRef"
      :editor="editorRef.editor"
      :configure="configure"
      :toolbar-list="[
        'bold',
        'strike',
        'underline',
        'link',
        'ordered',
        'bullet',
        'image',
        'video',
      ]"
      class="editor-bar"
    />

    <el-editor
      ref="editorRef"
      v-model="html"
      disable-enter-emit
      placeholder="输入点什么"
      class="editor-wrapper"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from 'element-plus'
import type { ISetImageOptions, ISetVideOptions } from 'element-plus-x'

const html = ref()
const editorRef = ref()

const configure = {
  image: {
    onChange(
      uploadFile: UploadFile,
      callback: (options: ISetImageOptions) => void
    ) {
      // 后台接口得到图片的真实地址，调用callback回显
      setTimeout(() => {
        callback({
          src: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          alt: '图片',
          title: '图片',
        })
      }, 300)
    },
  },
  video: {
    onChange(
      uploadFile: UploadFile,
      callback: (options: ISetVideOptions) => void
    ) {
      console.log('视频:', uploadFile)
      // 后台接口得到视频的真实地址，调用callback回显
      setTimeout(() => {
        callback({
          src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          width: 320,
        })
      }, 300)
    },
  },
}
</script>

<style lang="scss">
.editor {
  max-width: 500px;
  &-wrapper {
    min-height: 200px;
    img {
      max-width: 400px;
    }
  }
}
</style>
