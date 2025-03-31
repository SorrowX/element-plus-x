<template>
  <el-radio-group v-model="justify">
    <el-radio-button
      v-for="item in justifyOptions"
      :key="item"
      :label="item"
      :value="item"
    />
  </el-radio-group>

  <div style="margin-top: 12px">
    <el-radio-group v-model="align">
      <el-radio-button
        v-for="item in alignOptions"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-radio-group>
  </div>

  <el-flex :justify="justify" class="flex-content" :align="align">
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="primary" plain>Primary</el-button>
  </el-flex>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FlexProps } from 'element-plus-x'

const justifyOptions = reactive<FlexProps['justify'][]>([
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
  'space-evenly',
])

const alignOptions = reactive<FlexProps['align'][]>([
  'flex-start',
  'center',
  'flex-end',
])

const justify = ref(justifyOptions[0])
const align = ref(alignOptions[0])
</script>

<style scoped lang="scss">
.flex-content {
  width: 100%;
  height: 120px;
  border-radius: 6px;
  border: 1px solid #e2e2e2;
  margin-top: 12px;
}
</style>
