<template>
  <el-input-otp v-model="value">
    <template #default="{ index }">
      <span v-if="index === 1" style="margin-left: 8px"> - </span>
      <span v-if="index === 3" style="margin-left: 8px"> - </span>
    </template>
  </el-input-otp>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([5, 9, 4, 2, 0, 6])
</script>
