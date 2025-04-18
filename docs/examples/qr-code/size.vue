<template>
  <el-button-group>
    <el-button @click="add">尺寸+10</el-button>
    <el-button @click="subtract">尺寸-10</el-button>
  </el-button-group>
  <br />
  <el-qr-code :text="text" :size="size" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const text = ref<string>('Summer')

const size = ref<number>(150)

const add = () => (size.value += 10)

const subtract = () => (size.value -= 10)
</script>
