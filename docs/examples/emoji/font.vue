<template>
  <p style="font-size: 30px">绑定值: {{ value }}</p>
  <el-font-emoticon v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>
