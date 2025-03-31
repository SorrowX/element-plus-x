<template>
  <el-bubble :content="content" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const content = ref('hello world !')
</script>
