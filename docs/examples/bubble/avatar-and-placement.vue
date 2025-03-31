<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-bubble
      placement="start"
      content="Good morning, how are you?"
      :avatar="{ style: fooAvatar }"
    />
    <el-bubble
      placement="start"
      content="What a beautiful day!"
      :avatar="{ style: hideAvatar }"
    />
    <el-bubble
      placement="end"
      content="Hi, good morning, I'm fine!"
      :avatar="{ style: barAvatar }"
    />
    <el-bubble
      placement="end"
      content="Thank you!"
      :avatar="{ style: hideAvatar }"
    />
    <el-bubble content="Use avatar slot">
      <template #avatar>
        <el-avatar :icon="UserFilled" :style="fooAvatar" />
      </template>
    </el-bubble>
  </div>
</template>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue'
import type { CSSProperties } from 'vue'

const fooAvatar: CSSProperties = {
  color: '#f56a00',
  backgroundColor: '#fde3cf',
}

const barAvatar: CSSProperties = {
  color: '#fff',
  backgroundColor: '#87d068',
}

const hideAvatar: CSSProperties = {
  visibility: 'hidden',
}
</script>
