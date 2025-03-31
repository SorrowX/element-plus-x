<template>
  <el-renderer :renderer="renderMsg" :data="types" />
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { ElButton, ElSpace } from 'element-plus'

const types = ['primary', 'success', 'info', 'warning', 'danger']

const renderMsg = (data) =>
  h(
    ElSpace,
    {
      size: 16,
    },
    {
      default: () =>
        data.map((type) => h(ElButton, { type }, { default: () => type })),
    }
  )
</script>
