<template>
  <el-input-otp v-model="value" @input="handleInput" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const value = ref([5, 9, 4, 2, 0, 6])

const handleInput = (value: string, index: number) => {
  ElMessage(`input: ${value}-${index}`)
}
</script>
