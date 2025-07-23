<template>
  <el-collapse-panel title="我是标题" dashed>
    <template #action>
      <el-switch v-model="bool" />
    </template>
    <div style="padding: 12px">hi, Summer</div>
  </el-collapse-panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const bool = ref(false)
</script>
