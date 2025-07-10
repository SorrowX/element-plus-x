<template>
  <div
    style="
      width: 500px;
      height: 500px;
      position: relative;
      border: 1px solid #ccc;
    "
  >
    <ElResizable
      :w="200"
      :h="200"
      :minw="150"
      :minh="150"
      :parent-limitation="true"
      class="ep-bg-purple-light"
      @resize="handleChange"
      @drag="handleChange"
    >
      <el-flex vertical justify="center" style="height: 100%">
        <el-text>{{ top }} х {{ left }}</el-text>
        <el-text>{{ width }} х {{ height }}</el-text>
        <el-text>Drag edge to resize</el-text>
      </el-flex>
    </ElResizable>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const top = ref(0)
const left = ref(0)
const width = ref(0)
const height = ref(0)

const handleChange = (rect) => {
  top.value = rect.top
  left.value = rect.left
  width.value = rect.width
  height.value = rect.height
}
</script>
