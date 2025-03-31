<template>
  <el-list
    ref="listRef"
    class="list-load"
    :list="list"
    style="height: 680px"
    :pre-load="handlePreLoad"
    :finished="finished"
    no-more-text="没有更多聊天内容啦"
  >
    <template #default="{ data }">
      <div class="item-content">
        <el-bubble
          :placement="data.placement"
          :content="data.content"
          :content-style="data.contentStyle"
          :avatar="{ style: data.avatar }"
        />
      </div>
    </template>
  </el-list>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const listRef = ref()

const generateArray = (len = 0) =>
  Array.from(Array.from({ length: 10 }).keys()).map((i) => {
    const index = len + i
    return {
      placement: index % 2 === 0 ? 'start' : 'end',
      content:
        index % 2 === 0
          ? `Row ${index} - ${`Good morning, how are you?`.repeat(
              Math.floor(Math.random() * 10)
            )}`
          : `Row ${index} - ${`Hi, good morning, I'm fine!`.repeat(
              Math.floor(Math.random() * 10)
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
      contentStyle: { maxWidth: '500px' },
    }
  })

const list = ref([...generateArray().reverse()])

const finished = ref(false)

const handlePreLoad = () => {
  console.log('load more')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5
      if (success) {
        list.value.unshift(...generateArray(list.value.length).reverse())

        if (list.value.length >= 50) {
          finished.value = true
        }
      }

      return success ? resolve(list.value) : reject()
    }, 1000 * 1)
  })
}

onMounted(() => {
  listRef.value.scrollToBottom()
})
</script>

<style lang="scss" scoped>
.item-content {
  box-sizing: border-box;
  padding: 6px 12px;
  margin: 8px;
}

.text {
  text-align: center;
  margin: 6px;
}
</style>
