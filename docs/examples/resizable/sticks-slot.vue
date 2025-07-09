<template>
  <el-resizable
    :w="200"
    :h="200"
    :minw="150"
    :minh="150"
    :sticks="['br']"
    class="resizable-wrapper"
    @resize="handleResize"
  >
    <el-flex vertical justify="center" style="height: 100%">
      <el-text>{{ top }} х {{ left }}</el-text>
      <el-text>{{ width }} х {{ height }}</el-text>
      <el-text>Drag edge to resize</el-text>
    </el-flex>
    <template #br>
      <el-icon style="top: -6px; left: -5px"><Resize /></el-icon>
    </template>
  </el-resizable>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { IconsVue } from 'element-plus-x'
const { createIconComponent } = IconsVue

const Resize = createIconComponent({
  name: 'Resize',
  svg: '<svg t="1752049831306" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8586" width="200" height="200"><path d="M972.8 497.8176v79.5648l-395.3664 395.3664H497.8688L972.8 497.8176z m0-307.2v79.5648L270.2336 972.7488H190.6688L972.8 190.6176z m0 614.4v79.5648L884.5824 972.8h-79.5648L972.8 805.0176z" p-id="8587"></path></svg>',
})

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
