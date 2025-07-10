<template>
  <el-resizable
    :w="200"
    :h="200"
    :minw="150"
    :minh="150"
    class="resizable-wrapper"
    @resize="handleResize"
  >
    <el-flex vertical justify="center" style="height: 100%">
      <el-text>{{ top }} х {{ left }}</el-text>
      <el-text>{{ width }} х {{ height }}</el-text>
      <el-text>Drag edge to resize</el-text>
    </el-flex>
  </el-resizable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const top = ref(0)
const left = ref(0)
const width = ref(0)
const height = ref(0)

const handleResize = (rect) => {
  top.value = rect.top
  left.value = rect.left
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="scss">
.resizable-wrapper {
  background: rgba(230, 232, 234, 1);
}
</style>
