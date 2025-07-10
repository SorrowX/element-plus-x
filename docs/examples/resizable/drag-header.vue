<template>
  <div class="resizable">
    <el-resizable
      :w="200"
      :h="200"
      :minw="150"
      :minh="150"
      is-custom-draggable
      class="ep-bg-purple-light"
      @resize="handleChange"
      @drag="handleChange"
    >
      <template #default="{ handleTargetDown }">
        <el-flex vertical style="height: 100%">
          <div class="header ep-bg-purple" @pointerdown="handleTargetDown">
            header drag
          </div>
          <el-text>{{ top }} х {{ left }}</el-text>
          <el-text>{{ width }} х {{ height }}</el-text>
          <el-text>Drag edge to resize</el-text>
        </el-flex>
      </template>
    </el-resizable>
  </div>
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
.resizable {
  position: relative;
  height: 200px;
  .header {
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin-bottom: 12px;
    cursor: move;
  }
}
</style>
