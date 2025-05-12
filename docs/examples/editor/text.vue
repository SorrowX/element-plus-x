<template>
  <div style="margin-bottom: 12px">
    <el-emoji @change="insertImage">
      <template #trigger>
        <el-button size="small" style="margin-right: 12px">
          插入表情包
        </el-button>
      </template>
    </el-emoji>
    <el-button size="small" @click="insertTag">插入Tag</el-button>
    <el-button size="small" @click="getHtml">获取html内容</el-button>
    <el-button size="small" type="success" @click="getText">
      html2text
    </el-button>
  </div>

  <el-editor
    ref="editor"
    v-model="html"
    class="edit-wrapper"
    style="max-width: 500px; min-height: 180px; margin-bottom: 12px"
  />

  <el-input
    v-model="content"
    placeholder="赋值回显"
    show-word-limit
    type="textarea"
    style="max-width: 500px"
    :autosize="{ minRows: 4, maxRows: 8 }"
  />

  <div
    style="margin-top: 20px; width: 500px; max-height: 200px; overflow: auto"
  >
    {{ content }}
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getTextContent } from 'element-plus-x'

const html = ref()
const editor = ref(null)
const content = ref()

function getHtml() {
  content.value = editor.value.getHtml()
}

function getText() {
  content.value = getTextContent(editor.value.getHtml(), [
    {
      tag: 'component',
      attr: 'value',
    },
    {
      tag: 'img',
      attr: 'alt',
    },
    {
      tag: 'tag',
      attr: 'id',
    },
  ])
}

const insertImage = (item, type) => {
  if (type === 'wx') {
    editor.value.setImage({
      src: item.image,
      alt: item.text,
    })
  } else {
    editor.value.insertHtml(
      `<component is="span" wrap-class="wrap-class" value="${item.text}">${item.text}</component>`
    )
  }
}

const getRandom = () => Math.floor(Math.random() * 100)
const insertTag = () => {
  const id = getRandom()
  editor.value.insertHtml(
    `<tag id="Summer${id}" class="tag" text="Summer${id}"></tag> `
  )
}
</script>

<style lang="scss">
.edit-wrapper {
  p {
    vertical-align: middle;
  }
  img {
    display: inline-block;
    vertical-align: text-bottom;
  }
  .wrap-class {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    span {
      width: 24px;
      height: 24px;
      font-size: 22px;
    }
  }
}
</style>
