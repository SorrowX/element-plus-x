<template>
  <el-space :size="20">
    <el-icon :size="30" color="#ea1d26"><QQ /></el-icon>
    <el-icon :size="30" color="#00dc6c"><Wechat /></el-icon>
  </el-space>
</template>

<script lang="ts" setup>
import { IconsVue } from 'element-plus-x'
const { QQ, Wechat } = IconsVue
</script>
