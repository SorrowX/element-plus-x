<template>
  <div class="editor">
    <el-editor-toolbar
      v-if="editorRef"
      :editor="editorRef.editor"
      :configure="configure"
      :toolbar-list="[
        'heading',
        'divider',
        'bold',
        'strike',
        'divider',
        'underline',
        'link',
        'divider',
        'ordered',
        'bullet',
        'image',
        'video',
        'font-size',
        'divider',
      ]"
      class="editor-bar"
    >
      <!-- <template #prepend>
        <div>前置内容</div>
      </template>-->
      <template #append>
        <el-dropdown-v2
          width="120"
          trigger="click"
          :options="options"
          :tooltip-options="{
            offset: 14,
            showArrow: true,
            placement: 'bottom-start',
          }"
          @change="handleChange"
        >
          <div class="el-editor-icon toolbar__more">
            <el-icon size="16" color="#656e82"><MoreFilled /></el-icon>
          </div>
          <template #label="{ label, text }">
            <el-flex style="width: 100%" justify="space-between">
              <span>{{ label }}</span>
              <span>{{ text }}</span>
            </el-flex>
          </template>
        </el-dropdown-v2>
      </template>
    </el-editor-toolbar>

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
import { ElIcon } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import type { ISetImageOptions, ISetVideOptions } from 'element-plus-x'

const handleChange = (value, valuePath) => {
  console.log(value, valuePath)
}

const options = [
  {
    label: '复制',
    value: 'copy',
    text: 'ctrl+c',
  },
  {
    label: '粘贴',
    value: 'paste',
    text: 'ctrl+v',
  },
  {
    label: '删除',
    value: 'delete',
    text: 'del',
  },
]

const html = ref(`自定义Toolbar`)
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

<style lang="scss" scoped>
.editor {
  max-width: 580px;
  &-wrapper {
    min-height: 200px;
    img {
      max-width: 400px;
    }
  }
  .editor-bar {
    padding: 4px 4px 4px 8px;
    display: inline-flex;
    border-radius: 8px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .toolbar__more {
    position: relative;
    top: 3px;
    i {
      transform: rotateZ(90deg);
    }
  }
}
</style>
