<template>
  <div style="margin-bottom: 12px">
    <el-emoji @change="insertImage">
      <template #trigger>
        <el-button size="small">插入表情包</el-button>
      </template>
    </el-emoji>
  </div>

  <el-editor
    ref="editor"
    v-model="html"
    class="edit-wrapper"
    style="width: 500px; min-height: 180px"
  />
</template>

<script setup>
import { ref } from 'vue'

const content = ref()
const html = ref()
const editor = ref(null)

const insertImage = (item) => {
  editor.value.setImage({
    src: item.image,
    alt: item.text,
  })
}
</script>

<style lang="scss">
.edit-wrapper {
  img {
    display: inline-block;
    vertical-align: text-bottom;
  }
}
</style>
