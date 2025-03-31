<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-bubble
      :avatar="{ icon: UserFilled }"
      variant="filled"
      content="variant: filled"
    />
    <el-bubble
      :avatar="{ icon: UserFilled }"
      variant="outlined"
      content="variant: outlined"
    />
    <el-bubble
      :avatar="{ icon: UserFilled }"
      variant="shadow"
      content="variant: shadow"
    />
    <el-bubble :avatar="{ icon: UserFilled }" variant="borderless">
      <template #content>
        <span>variant: borderless</span>
        <p>content slot</p>
      </template>
    </el-bubble>
  </div>
</template>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
</script>
