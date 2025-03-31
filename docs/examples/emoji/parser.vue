<template>
  <el-emoji v-model="text">
    <template #trigger>
      <el-button>点我试试</el-button>
    </template>
  </el-emoji>

  <p>原生文案: {{ text }}</p>
  <div v-html="imgHtml" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { emotionParser } from 'element-plus-x'

const text = ref()
const imgHtml = computed(() =>
  emotionParser(`<p>当前被选中的图片是</p>${text.value ? text.value : ''}`)
)

console.log(emotionParser(`早上好[流泪]`))
// 早上好<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/5.gif" alt="[流泪]">
</script>
