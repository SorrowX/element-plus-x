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

const html = ref()
const editor = ref(null)

const insertImage = (item, type) => {
  if (type === 'wx') {
    editor.value.setImage({
      src: item.image,
      alt: item.text,
    })
  } else {
    editor.value.insertHtml(
      `<component is="span" wrap-class="wrap-class">${item.text}</component>`
    )
  }
}
</script>

<style lang="scss">
.edit-wrapper {
  img {
    display: inline-block;
    vertical-align: text-bottom;
  }
  .wrap-class {
    display: inline-flex;
    width: 24px;
    height: 24px;
    overflow: hidden;
    font-size: 21px;
    align-items: center;
    justify-content: center;
  }
}
</style>
