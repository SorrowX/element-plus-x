<template>
  <el-virtual-list
    ref="virtualListRef"
    class="list-load"
    :list="list"
    style="height: 500px"
    :item-size="80"
    :infinite-scrollup="handleLoad"
    :infinite-scroll-disabled="disabled"
  >
    <template #before>
      <p class="text">{{ noMore ? 'No more' : 'Loading...' }}</p>
    </template>
    <template #default="{ data }">
      <div class="item-content">
        <el-bubble
          :placement="data.placement"
          :content="data.content"
          :avatar="{ style: data.avatar }"
        />
      </div>
    </template>
  </el-virtual-list>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'

const virtualListRef = ref()

const generateArray = (len = 0) =>
  Array.from(Array.from({ length: 10 }).keys()).map((i) => {
    const index = len + i
    return {
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

const list = ref([])

const loading = ref(false)
const noMore = computed(() => list.value.length >= 100)
const disabled = computed(() => loading.value || noMore.value)

const handleLoad = () => {
  if (loading.value) return
  loading.value = true
  return new Promise((resolve) => {
    setTimeout(() => {
      list.value.unshift(...generateArray(list.value.length).reverse())
      console.log('load more', list.value.length)
      loading.value = false
      return resolve()
    }, 1000 * 1)
  })
}

onMounted(() => {
  list.value.push(...generateArray().reverse())
  nextTick(() => {
    virtualListRef.value.scrollTo(list.value.length)
  })
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
