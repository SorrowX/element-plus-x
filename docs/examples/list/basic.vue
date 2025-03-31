<template>
  <el-list
    class="list-load"
    :list="list"
    style="height: 500px"
    :load="handleLoad"
    :finished="finished"
  >
    <template #default="{ index, data }">
      <div class="item-content">
        <div>Row {{ index }}</div>
        <el-text v-html="data.text" />
      </div>
    </template>
  </el-list>
</template>

<script setup>
import { ref } from 'vue'

const textArray = [
  '你是自己故事的作者。<br>',
  '你的生活是你的作品。<br>',
  '挑战是成长的阶梯。<br>',
  '积极面对，挑战不难。<br>',
  '你的未来取决于你现在的选择。<br>',
]

const generateArray = () =>
  Array.from(Array.from({ length: 10 }).keys()).map((i) => ({
    text: textArray
      .slice(0, Math.ceil(Math.random() * textArray.length))
      .join(''),
  }))

const list = ref(generateArray())
const finished = ref(false)

const handleLoad = () => {
  console.log('load more')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5
      if (success) {
        list.value.push(...generateArray())

        if (list.value.length >= 30) {
          finished.value = true
        }
      }

      return success ? resolve() : reject()
    }, 1000 * 1)
  })
}
</script>

<style lang="scss" scoped>
.item-content {
  box-sizing: border-box;
  padding: 6px 12px;
  margin: 8px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
}

.text {
  text-align: center;
  margin: 6px;
}
</style>
