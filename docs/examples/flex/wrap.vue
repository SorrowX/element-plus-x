<template>
  <el-radio-group v-model="value" style="margin-bottom: 12px">
    <el-radio-button
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-radio-group>

  <el-flex :wrap="value" gap="8">
    <el-tag v-for="(item, index) in new Array(24)" :key="item" type="primary">
      Tag {{ index + 1 }}
    </el-tag>
  </el-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const options = reactive(['wrap', 'nowrap', 'wrap-reverse'])

const value = ref('wrap')
</script>
