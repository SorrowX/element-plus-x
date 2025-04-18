<template>
  <el-qr-code :text="text" />
  <br />
  <el-input v-model="text" style="width: 240px" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref<string>('Summer')
</script>
