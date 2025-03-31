<template>
  <el-contextmenu ref="contextMenuRef">
    <div class="contextmenu__content">鼠标右击试试</div>
    <template #menu>
      <div class="contextmenu__menu">
        <div v-for="o in 4" :key="o" class="text item" @click="hide">
          {{ 'List item ' + o }}
        </div>
      </div>
    </template>
  </el-contextmenu>
</template>

<script setup>
import { ref } from 'vue'
const contextMenuRef = ref()
const hide = () => contextMenuRef.value.hide()
</script>

<style lang="scss">
.contextmenu {
  &__content {
    width: 400px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 12px;
  }
  &__menu {
    min-width: 140px;
    padding: 0px 16px;
    .item {
      cursor: pointer;
      margin: 12px 0px;
    }
  }
}
</style>
