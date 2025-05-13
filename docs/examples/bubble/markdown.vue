<template>
  <el-bubble
    :key="count"
    :content="content"
    :message-render="renderMarkdown"
    :typing="{ step: 5, interval: 60 }"
  />

  <el-button style="margin-top: 12px" @click="count++">ReRender</el-button>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import markdownit from 'markdown-it'

const count = ref(1)

const content = ref(
  `
  > Render as markdown content to show rich text!

  Link: [ElementPlus X](https://sorrowx.github.io/epx/zh-CN/component/overview.html)


`.trim()
)

const md = markdownit({ html: true, breaks: true })

const renderMarkdown = (content) => h('div', { innerHTML: md.render(content) })
</script>
