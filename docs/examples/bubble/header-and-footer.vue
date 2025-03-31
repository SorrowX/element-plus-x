<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <el-bubble avatar :content="content" header="字符串渲染" footer="footer" />

    <el-bubble avatar placement="end" :content="content">
      <template #header> 模版渲染 </template>
      <template #footer>
        <el-space>
          <el-icon><Refresh /></el-icon>
          <el-icon><ChatSquare /></el-icon>
        </el-space>
      </template>
    </el-bubble>

    <el-bubble
      avatar
      placement="start"
      :content="content"
      header="tsx或者render渲染"
      :footer="footer"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { ElIcon, ElSpace } from 'element-plus'
import { ChatSquare, Loading, Refresh } from '@element-plus/icons-vue'

const content = ref('hello world !')

const footer = (
  <ElSpace>
    <ElIcon class="is-loading">
      <Loading />
    </ElIcon>
    VNode 渲染
  </ElSpace>
)
</script>
