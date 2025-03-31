<template>
  <el-text-highlight :content="content" text="Vue" ignore-case />
</template>

<script setup>
import { ref } from 'vue'

const content = ref(
  `Vue及其全家桶——vue router、vuex、Vue CLI等，如同一套精心设计的工具箱，让前端开发如虎添翼，无论是构建复杂单页应用还是优化开发流程，都显得游刃有余，尽显专业与高效。`
)
</script>
