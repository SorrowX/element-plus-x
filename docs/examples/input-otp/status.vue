<template>
  <p>只读状态、禁用状态、密码</p>
  <el-input-otp v-model="value" readonly /> <br />
  <el-input-otp v-model="value" disabled /> <br />
  <el-input-otp v-model="value" show-password /> <br />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([5, 9, 4, 2, 0, 6])
</script>
