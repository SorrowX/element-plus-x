<template>
  <el-switch
    v-model="value"
    size="large"
    active-text="点我渲染"
    inactive-text="窗口隐藏"
  />
  <br />
  <el-resizable
    v-show="value"
    :w="200"
    :h="200"
    :minw="150"
    :minh="150"
    :parent-w="parentW"
    :parent-h="parentH"
    :parent-limitation="true"
    :z="1000"
    style="position: fixed"
    class="ep-bg-purple-light"
    @resize="handleChange"
    @drag="handleChange"
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

const value = ref(false)

const top = ref(0)
const left = ref(0)
const width = ref(0)
const height = ref(0)

const parentW = ref(window.innerWidth)
const parentH = ref(window.innerHeight)

const handleChange = (evt, rect) => {
  top.value = rect.top
  left.value = rect.left
  width.value = rect.width
  height.value = rect.height
}
</script>
