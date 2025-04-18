<template>
  <div style="margin-bottom: 16px">
    <el-space>
      <span>color</span>
      <el-color-picker v-model="color" />
      <span>backgroundColor</span>
      <el-color-picker v-model="backgroundColor" />
    </el-space>
  </div>
  <el-qr-code
    :text="text"
    :color="color"
    :background-color="backgroundColor"
    :margin="1"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref<string>('Summer')
const color = ref<string>()
const backgroundColor = ref<string>()
</script>
