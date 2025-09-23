<template>
  <p>小、默认、大、铺平</p>
  <el-input-otp v-model="value" size="small" /> <br />
  <el-input-otp v-model="value" /> <br />
  <el-input-otp v-model="value" size="large" /> <br />
  <el-input-otp v-model="value" size="auto" /> <br />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([5, 9, 4, 2, 0, 6])
</script>
