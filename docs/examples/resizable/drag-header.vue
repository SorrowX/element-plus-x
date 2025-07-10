<template>
  <el-resizable
    :w="200"
    :h="200"
    :minw="150"
    :minh="150"
    is-custom-draggable
    class="resizable-wrapper"
    @resize="handleChange"
    @drag="handleChange"
  >
    <template #default="{ handleTargetDown }">
      <el-flex vertical style="height: 100%">
        <div class="header" @pointerdown="handleTargetDown">header</div>
        <el-text>{{ top }} х {{ left }}</el-text>
        <el-text>{{ width }} х {{ height }}</el-text>
        <el-text>Drag edge to resize</el-text>
      </el-flex>
    </template>
  </el-resizable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const top = ref(0)
const left = ref(0)
const width = ref(0)
const height = ref(0)

const handleChange = (evt, rect) => {
  top.value = rect.top
  left.value = rect.left
  width.value = rect.width
  height.value = rect.height
}
</script>

<style lang="scss" scoped>
.resizable-wrapper {
  background: rgba(230, 232, 234, 1);
  .header {
    height: 32px;
    background-color: #8bd0a7;
    cursor: move;
  }
}
</style>
