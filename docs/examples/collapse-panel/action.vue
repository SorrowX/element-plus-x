<template>
  <el-collapse-panel title="我是标题" :collapse="false" dashed>
    <template #action>
      <el-switch v-model="bool" />
    </template>
    <div>子内容</div>
  </el-collapse-panel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const bool = ref(false)
</script>
