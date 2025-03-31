<template>
  <el-radio-group v-model="nativeScrollbar" style="margin-bottom: 24px">
    <el-radio-button label="原生滚动条" :value="true" />
    <el-radio-button label="ElScrollbar" :value="false" />
  </el-radio-group>

  <el-virtual-list
    :key="nativeScrollbar"
    class="list"
    :list="list"
    style="height: 500px"
    :item-size="150"
    :overscan="20"
    :native-scrollbar="nativeScrollbar"
  >
    <template #default="{ index, data }">
      <div class="item-content">
        <div>Row {{ index }}</div>
        <el-text v-html="data.text" />
      </div>
    </template>
  </el-virtual-list>
</template>

<script setup>
import { ref } from 'vue'

const nativeScrollbar = ref(false)

const textArray = [
  '你是自己故事的作者。<br>',
  '你的生活是你的作品。<br>',
  '挑战是成长的阶梯。<br>',
  '积极面对，挑战不难。<br>',
  '你的未来取决于你现在的选择。<br>',
]

const list = ref(
  Array.from(Array.from({ length: 10000 }).keys()).map((i) => ({
    text: textArray
      .slice(0, Math.ceil(Math.random() * textArray.length))
      .join(''),
  }))
)
</script>

<style lang="scss" scoped>
.item-content {
  box-sizing: border-box;
  padding: 6px 12px;
  margin: 8px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
  overflow: hidden;
}
</style>
