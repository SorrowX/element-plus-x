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
import { ElBubbleList } from 'element-plus-x'
import { ElIcon, ElSpace } from 'element-plus'
import {
  ChatLineRound,
  Loading,
  Refresh,
  UserFilled,
} from '@element-plus/icons-vue'
import type { BubbleListProps } from 'element-plus-x'

const roles: BubbleListProps['roles'] = {
  ai: {
    placement: 'start',
    avatar: { icon: UserFilled, style: { background: '#fde3cf' } },
    typing: { step: 5, interval: 20 },
    style: {
      maxWidth: '600px',
      marginInlineEnd: '44px',
    },
    footerStyle: {
      width: '100%',
    },
    loadingRender: () => (
      <ElSpace>
        <ElIcon class="is-loading" color="#f60">
          <Loading />
        </ElIcon>
        Custom loading...
      </ElSpace>
    ),
  },
  user: {
    placement: 'end',
    avatar: { icon: UserFilled, style: { background: '#87d068' } },
  },
}

const items = ref([
  {
    key: 'welcome',
    role: 'ai',
    content: 'Mock welcome content. '.repeat(10),
    footer: (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ElIcon>
          <Refresh />
        </ElIcon>
        <ElIcon>
          <ChatLineRound />
        </ElIcon>
      </div>
    ),
  },
  {
    key: 'ask',
    role: 'user',
    content: 'Mock user content.',
  },
  {
    key: 'ai',
    role: 'ai',
    loading: true,
    content: 'hihihihi.',
  },
])
</script>
