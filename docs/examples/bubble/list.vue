<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <div>
      <el-button @click="add">Add Bubble</el-button>
      <el-button @click="scrollTo">Scroll To First</el-button>
    </div>
    <el-bubble-list
      ref="listRef"
      style="max-height: 300px"
      :roles="roles"
      :items="items"
      :on-last-bubble-typing-complete="handleLastBubbleTypingComplete"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElBubbleList } from 'element-plus-x'
import { UserFilled } from '@element-plus/icons-vue'
import type { BubbleListProps, BubbleListRef } from 'element-plus-x'

const roles: BubbleListProps['roles'] = {
  ai: {
    placement: 'start',
    avatar: { icon: UserFilled, style: { background: '#fde3cf' } },
    contentStyle: {
      maxWidth: '600px',
    },
  },
  user: {
    placement: 'end',
    avatar: { icon: UserFilled, style: { background: '#87d068' } },
  },
}

const count = ref<number>(3)

const add = () => (count.value += 1)

const scrollTo = () => listRef.value?.scrollTo({ key: 0, block: 'nearest' })

const handleLastBubbleTypingComplete = (key) => {
  console.log('last bubble typing complete:', key)
}

const listRef = ref<BubbleListRef>()

const items = computed(() => {
  return Array.from({ length: count.value }).map((_, i) => {
    const isAI = !!(i % 2)
    const content = isAI ? 'Mock AI content. '.repeat(20) : 'Mock user content.'

    const typing = i > 2 ? { step: 5, interval: 20 } : false

    return {
      key: i,
      role: isAI ? 'ai' : 'user',
      content,
      typing,
    }
  })
})
</script>
