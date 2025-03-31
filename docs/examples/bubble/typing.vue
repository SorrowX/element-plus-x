<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-bubble
      avatar
      placement="start"
      :content="text.repeat(repeat)"
      :typing="{ step: 2, interval: 50 }"
      :content-style="{ 'max-width': '60%' }"
    />
    <el-bubble
      avatar
      placement="end"
      :content="text.repeat(repeat)"
      :typing="{ step: 2, interval: 50, suffix: '💗' }"
      :content-style="{ 'max-width': '60%' }"
    />
    <el-button @click="() => (repeat = repeat < 10 ? repeat + 1 : 1)">
      Repeat {{ repeat }} Times
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('ElementPlusX love you! ')
const repeat = ref(1)
</script>
