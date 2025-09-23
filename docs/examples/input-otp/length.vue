<template>
  <el-input-otp v-model="value" :length="4" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
