<template>
  <el-bubble
    :key="count"
    class="bubble-box"
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

  ![可爱图片](https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-05-20/16910ba6-0708-48d2-9693-27ea40e2cd30/1.jpg)

  <video src="https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-05-21/659fa31d-dc87-4882-8be5-1fba8fb7e6ff/flower.mp4" controls width="320"></video>
`.trim()
)

const md = markdownit({ html: true, breaks: true })

const renderMarkdown = (content) => h('div', { innerHTML: md.render(content) })
</script>

<style lang="scss">
.bubble-box {
  img {
    max-width: 200px;
  }
}
</style>
