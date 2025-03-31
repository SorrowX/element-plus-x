<template>
  <el-bubble
    v-for="(item, index) in list"
    :key="index"
    :placement="item.placement"
    :avatar="{ style: item.avatar }"
    content-class="bubble__content"
  >
    <template #content>
      <div
        class="bubble__content-block"
        @contextmenu="(e) => handleContextMenu(e, item)"
      >
        {{ item.content }}
      </div>
    </template>
  </el-bubble>

  <el-contextmenu ref="contextMenuRef">
    <template #menu>
      <div class="contextmenu__menu">
        <div class="item">id-{{ data.id }}</div>
        <div v-for="o in 4" :key="o" class="text item" @click="hide">
          {{ 'List item ' + o }}
        </div>
      </div>
    </template>
  </el-contextmenu>
</template>

<script setup>
import { ref } from 'vue'

const generateArray = (len = 0) =>
  Array.from(Array.from({ length: 10 }).keys()).map((i) => {
    const index = len + i
    return {
      id: index,
      placement: index % 2 === 0 ? 'start' : 'end',
      content:
        index % 2 === 0
          ? `Row ${index} - ${`Good morning, how are you?`.repeat(
              1 ?? Math.floor(Math.random() * 10)
            )}`
          : `Row ${index} - ${`Hi, good morning, I'm fine!`.repeat(
              1 ?? Math.floor(Math.random() * 10)
            )}`,
      avatar:
        index % 2 === 0
          ? {
              color: '#f56a00',
              backgroundColor: '#fde3cf',
            }
          : {
              color: '#fff',
              backgroundColor: '#87d068',
            },
    }
  })

const list = ref(generateArray())
const contextMenuRef = ref()
const data = ref({})

const hide = () => {
  contextMenuRef.value.hide()
}

const handleContextMenu = (e, item) => {
  contextMenuRef.value.handleContextMenu(e)
  data.value = item
}
</script>

<style lang="scss">
.bubble__content {
  padding: 0px !important;
  &-block {
    padding: 12px 16px;
  }
}
.contextmenu {
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
