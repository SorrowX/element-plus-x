<template>
  <el-switch
    v-model="disabled"
    size="large"
    active-text="禁用"
    inactive-text="启用"
  />

  <el-editor
    v-model="value"
    style="width: 320px"
    :disabled="disabled"
    placeholder="Please input"
    disable-enter-emit
  />
</template>

<script setup>
import { ref } from 'vue'

const value = ref('hi 徐尹啊 <br /> 今天又是苦逼的一天')
const disabled = ref(true)
</script>
