<template>
  <el-radio-group v-model="gapSize">
    <el-radio-button
      v-for="item in options"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-radio-group>

  <el-slider
    v-if="gapSize === 'customize'"
    v-model="customGapSize"
    style="margin-top: 12px"
  />

  <el-flex
    :gap="gapSize === 'customize' ? customGapSize : gapSize"
    class="flex-content"
  >
    <el-tag type="primary" plain>Primary</el-tag>
    <el-tag type="success" plain>Success</el-tag>
    <el-tag type="info" plain>Info</el-tag>
    <el-tag type="warning" plain>Warning</el-tag>
    <el-tag type="danger" plain>Danger</el-tag>
  </el-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FlexProps } from 'element-plus-x'

const options = reactive(['small', 'default', 'large', 'customize'])

const gapSize = ref<string>('small')
const customGapSize = ref<number>(0)
</script>

<style scoped lang="scss">
.flex-content {
  width: 100%;
  border-radius: 6px;
  margin-top: 24px;
}
</style>
