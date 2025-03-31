<template>
  <p>
    <el-switch
      v-model="value"
      size="small"
      active-text="10个tag"
      inactive-text="2个tag"
      @change="handleChange"
    />
  </p>
  <el-ellipsis style="max-width: 340px" popper-class="ellipsis-popper">
    <el-tag
      v-for="num in nums"
      :key="num"
      style="margin-right: 4px"
      disable-transitions
    >
      tag{{ num }}
    </el-tag>
    <template #action>
      <el-text style="margin-left: 10px" type="primary">...</el-text>
    </template>
  </el-ellipsis>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const nums = ref(10)
const value = ref(true)

const handleChange = (value) => {
  nums.value = value ? 10 : 2
}
</script>

<style lang="scss">
.ellipsis-popper {
  max-width: 200px;
}
</style>
