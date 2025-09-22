<template>
  <el-space direction="vertical">
    <p>只允许数字输入</p>
    <el-input-otp v-model="value" :validator="verifyNumber" />
    <p>只允许英文字母输入</p>
    <el-input-otp v-model="value2" :validator="verifyEnglish" />
  </el-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
const value2 = ref([])

const verifyNumber = (value: string) => !value || /^\d+$/.test(value)
const verifyEnglish = (value: string) => !value || /^[a-zA-Z]+$/.test(value)
</script>
