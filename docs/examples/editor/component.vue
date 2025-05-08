<template>
  <div style="margin-bottom: 12px">
    <el-button size="small" @click="insert1">插入任意原生标签</el-button>
    <el-button size="small" @click="insert2">插入Vue组件</el-button>
    <el-button size="small" @click="getHtml">获取html内容</el-button>
  </div>

  <el-editor
    ref="editor"
    v-model="html"
    disable-enter-emit
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

const insert1 = () =>
  insert(
    `<component is="div" style="border: 1px solid #ccc; width: 80%; margin-bottom: 12px; padding: 12px;">
      <p>1.component最终渲染为div</p>
      <span>2.这里的 h3和span元素都会作为div的子内容</span>
    </component>`
  )

const insert2 = () =>
  insert(
    `<component is="el-card" wrap-class="comp__wrap-class1" style="width: 80%; margin-bottom: 12px;">
      <el-flex vertical="vertical">
        <el-text type="primary">
          1. component最终渲染为ElCard组件
        </el-text>
        <el-text type="warning">
          2. 注意: component标签上的属性最终会被解析为字符串，也就意味着不能传入引用类型的值，属性的大小写也敏感
        </el-text>
        <el-text type="danger">
          3. component的子元素最终会被解析最为is组件的默认插槽内容
        </el-text>
      </el-flex>
    </component>`
  )
</script>

<style lang="scss">
.comp__wrap-class {
  display: inline-block;
}
</style>
