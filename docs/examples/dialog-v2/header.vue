<template>
  <el-dialog-v2
    width="500"
    title="标题"
    :trigger-props="{
      triggerText: 'Click me',
    }"
  >
    <template #header="{ close }">
      <el-flex
        justify="space-between"
        align="center"
        style="height: 48px; padding: 0 24px"
      >
        <span style="color: green">标题</span>
        <el-icon size="16" color="red" @click="close"><Close /></el-icon>
      </el-flex>
    </template>
    <div style="padding: 16px">hello word</div>
  </el-dialog-v2>
</template>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue'
</script>
