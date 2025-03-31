<template>
  <el-radio-group v-model="type" @change="handleChange">
    <el-radio-button label="文本" value="text" />
    <el-radio-button label="标识" value="code" />
    <el-radio-button label="图片" value="image" />
  </el-radio-group>
  <p>绑定值: {{ value }} <img v-if="type === 'image'" :src="value" /></p>
  <el-emoticon v-model="value" :type="type" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
const type = ref('text')

const handleChange = () => {
  value.value = ''
}
</script>
