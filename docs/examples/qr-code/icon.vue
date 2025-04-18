<template>
  <el-space :size="32">
    <el-qr-code
      :text="text"
      icon-src="https://avatars.githubusercontent.com/u/20411966?v=4&size=64"
    />

    <el-qr-code
      :text="text"
      icon-src="https://avatars.githubusercontent.com/u/20411966?v=4&size=64"
      :icon-config="{
        radius: 4,
        padding: 0,
        size: 30,
        backgroundColor: '#fff',
      }"
    />
  </el-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref<string>('Summer')
</script>
