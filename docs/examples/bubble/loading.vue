<template>
  <el-bubble avatar :content="content" :loading="loading" />

  <p style="margin-top: 8px">
    <span>Loading state: </span>
    <el-switch v-model="loading" />
  </p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref('hello world !')
const loading = ref(true)
</script>
