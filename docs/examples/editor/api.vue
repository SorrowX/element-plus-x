<template>
  <div style="margin-bottom: 12px">
    <el-button size="small" @click="insertText">插入文本</el-button>
    <el-button size="small" @click="insertHtml">插入html</el-button>
    <el-button size="small" @click="insertTag">插入自定义标签</el-button>
    <el-button size="small" @click="insertComp">插入Vue组件</el-button>
    <el-button size="small" @click="insertComp1">插入原生任意标签</el-button>
    <el-button size="small" @click="getHtml">获取html内容</el-button>
    <el-button size="small" @click="getText">获取text内容</el-button>
  </div>

  <el-editor
    ref="editor"
    v-model="html"
    style="width: 500px; height: 180px; overflow: auto"
  />

  <div
    style="margin-top: 20px; width: 500px; max-height: 200px; overflow: auto"
  >
    {{ content }}
  </div>
</template>

<script setup>
import { ref } from 'vue'

const content = ref()
const html = ref()
const editor = ref(null)

const getRandom = () => Math.floor(Math.random() * 100)

function insert(text) {
  editor.value.insertHtml(text)
}

function getHtml() {
  content.value = editor.value.getHtml()
}

function getText() {
  content.value = editor.value.getText()
}

const insertTag = () =>
  insert(
    `<tag other-attr="hi" disable-transitions  id="${getRandom()}" class="tag" text="Summer${getRandom()}"></tag>`
  )

const insertComp = () =>
  insert(
    `<component is="el-button" type="warning" size="small" style="margin: 0 6px 6px 0;" wrap-class="comp__wrap-class">点我</component>`
  )

const insertComp1 = () =>
  insert(
    `<component is="div"><div style="color: red"><i>hi summer</i></div></component>`
  )

const insertHtml = () =>
  insert(`
  <h1><a href="https://tiptap.dev/">Tiptap</a></h1>
  <p><strong>Hello World</strong></p>
  <p>This is a paragraph<br />with a break.</p>
  <p>And this is some additional string content.</p>
`)

const insertText = () => insert(`hello tiptap `)
</script>

<style lang="scss">
.comp__wrap-class {
  display: inline-block;
}
</style>
