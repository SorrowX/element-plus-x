<template>
  <el-virtual-list
    class="list"
    item-fixed
    :list="list"
    :overscan="20"
    :item-size="50"
    style="height: 500px"
    native-scrollbar
  >
    <template #default="{ index, data }">
      <div class="item-content" :style="{ height: 50 - 8 + 'px' }">
        Row {{ index }} - <el-text>{{ data.text }}</el-text>
      </div>
    </template>
  </el-virtual-list>
</template>

<script setup>
import { ref } from 'vue'

const list = ref(
  Array.from(Array.from({ length: 10000 }).keys()).map((i) => ({
    text: '每一天告诉自己：我能做到，我比昨天更好。',
  }))
)
</script>

<style lang="scss" scoped>
.item-content {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 6px 12px;
  margin: 8px 4px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}
</style>
