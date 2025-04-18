<template>
  <div style="margin-bottom: 16px">
    <el-radio-group v-model="radio">
      <el-radio-button label="low" value="L" />
      <el-radio-button label="medium" value="M" />
      <el-radio-button label="quartile" value="Q" />
      <el-radio-button label="high" value="H" />
    </el-radio-group>
  </div>
  <el-qr-code :text="text" :options="options" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
const text = ref<string>('https://cn.vuejs.org/')
const radio = ref('L')

const options = computed(() => {
  return {
    errorCorrectionLevel: radio.value,
  }
})
</script>
