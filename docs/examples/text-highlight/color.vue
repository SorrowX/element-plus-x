<template>
  <el-text-highlight :content="content" text="板凳" color="#626aef" />
</template>

<script setup>
import { ref } from 'vue'

const content = ref(
  `板凳宽，扁担长，扁担绑在板凳上，板凳偏不让扁担绑在板凳上。`
)
</script>
