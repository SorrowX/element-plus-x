<template>
  <div class="custom-editor">
    <el-editor-toolbar
      v-if="editorRef"
      :editor="editorRef.editor"
      :configure="configure"
      class="custom-editor-bar"
    />

    <el-editor
      ref="editorRef"
      v-model="html"
      :border="false"
      placeholder="输入点什么"
      disable-enter-emit
      class="custom-editor-wrapper"
    >
      <template #character-count="{ count }">
        <div class="custom-editor-count">
          <span>字符统计: {{ count }}</span>
        </div>
      </template>
    </el-editor>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from 'element-plus'
import type { ISetImageOptions, ISetVideOptions } from 'element-plus-x'

const html = ref()
const editorRef = ref()

const configure = {
  showTip: true,
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
.custom-editor {
  border-radius: 8px;
  border: 1px solid #ebeef5;
  max-width: 530px;

  &-wrapper {
    margin: 6px 6px 0 6px;
    border-top: 1px solid #ebeef5;
    .el-editor-wrapper {
      min-height: 400px;
      max-height: 600px;
      overflow: auto;
    }

    // 编辑器html内部样式-diy
    img {
      display: inline-block;
      vertical-align: text-bottom;
      max-width: 400px;
    }
    pre {
      background: #2e2b29;
      border-radius: 0.5rem;
      color: #fff;
      font-family: 'JetBrainsMono', monospace;
      margin: 1.5rem 0;
      padding: 0.75rem 1rem;
    }
    em {
      font-style: italic;
    }
    blockquote {
      border-left: 3px solid rgba(61, 37, 20, 0.12);
      margin: 1.5rem 0;
      padding-left: 1rem;
    }
    ul,
    ol {
      padding: 0 1rem;
      margin: 1.25rem 1rem 1.25rem 0.4rem;
    }
    ul li p,
    ol li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  &-count {
    border-top: 1px solid #ebeef5;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    span {
      color: #939599;
    }
  }
}
</style>
