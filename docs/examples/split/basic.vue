<template>
  <el-split
    v-model="value"
    style="max-width: 500px; height: 180px; box-shadow: 0 0 1px"
  >
    <template #left>
      <div style="padding: 10px">左侧面板</div>
    </template>
    <template #right>
      <div style="padding: 10px">右侧面板</div>
    </template>
  </el-split>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(0.3)
</script>
