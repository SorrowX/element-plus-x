<template>
  <el-space :size="32">
    <el-flex vertical>
      <el-qr-code
        ref="qrCodeRef"
        :text="text"
        :margin="1"
        icon-src="https://avatars.githubusercontent.com/u/20411966?v=4&size=64"
      />
      <el-button @click="handleClick">下载</el-button>
    </el-flex>

    <el-flex vertical>
      <el-qr-code ref="qrCodeRef1" :margin="1" :text="text" />
      <el-button @click="handleClick1">下载</el-button>
    </el-flex>
  </el-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const text = ref<string>('Summer')

const qrCodeRef = ref()
const qrCodeRef1 = ref()

const handleClick = () => {
  qrCodeRef.value.downloadQRCode()
}
const handleClick1 = () => {
  qrCodeRef1.value.downloadQRCode('code.png')
}
</script>
