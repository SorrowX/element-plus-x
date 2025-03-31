<template>
  <el-bubble-list
    ref="listRef"
    style="max-height: 300px"
    :roles="roles"
    :items="items"
  />
</template>

<script setup lang="tsx">
import { ref } from 'vue'
import { ElCard } from 'element-plus'
import { ElBubbleList } from 'element-plus-x'
import { UserFilled } from '@element-plus/icons-vue'
import type { BubbleListProps } from 'element-plus-x'

const roles: BubbleListProps['roles'] = {
  ai: {
    placement: 'start',
    typing: true,
    avatar: { icon: UserFilled, style: { background: '#fde3cf' } },
  },
  file: {
    placement: 'start',
    avatar: { icon: UserFilled, style: { visibility: 'hidden' } },
    variant: 'borderless',
    messageRender: (items) => (
      <div vertical gap="middle">
        {(items as any[]).map((item) => (
          <ElCard key={item.uid} style={{ marginBottom: '4px' }}>
            {item.name}
          </ElCard>
        ))}
      </div>
    ),
  },
}

const items = ref([
  // Normal
  {
    key: 0,
    role: 'ai',
    content: 'Normal message',
  },

  // VNode
  {
    key: 1,
    role: 'ai',
    content: <span>VNode message</span>,
  },
  // Role: file
  {
    key: 3,
    role: 'file',
    content: [
      {
        uid: '1',
        name: 'excel-file.xlsx',
        size: 111111,
        description: 'Checking the data',
      },
      {
        uid: '2',
        name: 'word-file.docx',
        size: 222222,
        status: 'uploading',
        percent: 23,
      },
    ],
  },
])
</script>
