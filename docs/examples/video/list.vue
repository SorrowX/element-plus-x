<template>
  <el-flex vertical>
    <el-bubble shape="arrow" :content-style="{ padding: '4px' }">
      <template #avatar>
        <el-avatar style="background: rgb(191 127 78)"> 尹 </el-avatar>
      </template>
      <template #default>
        <el-video
          readonly
          poster="https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-05-20/16910ba6-0708-48d2-9693-27ea40e2cd30/1.jpg"
          duration="1:56"
          style="max-width: 180px"
          :icon-props="{ color: 'rgba(255,255,255,0.7)' }"
          @click="handleClick(0)"
        />
      </template>
    </el-bubble>

    <el-bubble
      shape="arrow"
      placement="end"
      :content-style="{ padding: '4px' }"
    >
      <template #avatar>
        <el-avatar style="background: rgb(9 200 31)"> 徐 </el-avatar>
      </template>
      <template #default>
        <el-video
          readonly
          poster="https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-22-19/ab77e3d0-8933-4746-94af-bb66f6e58d38/视频.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
          duration="2:51"
          style="max-width: 160px"
          :icon-props="{ color: 'rgba(255,255,255,0.7)' }"
          @click="handleClick(1)"
        />
      </template>
    </el-bubble>

    <el-bubble shape="arrow" :content-style="{ padding: '4px' }">
      <template #avatar>
        <el-avatar style="background: rgb(191 127 78)"> 尹 </el-avatar>
      </template>
      <template #default>
        <el-video
          readonly
          poster="https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-05-20/c87f2d68-f318-4463-a61f-c4fc44b1f297/报纸墙可爱女孩白媗4K动漫壁纸_彼岸图网.jpg"
          duration="8:23"
          style="max-width: 250px"
          :icon-props="{ color: 'rgba(255,255,255,0.7)' }"
          @click="handleClick(0)"
        />
      </template>
    </el-bubble>
  </el-flex>
</template>

<script lang="ts" setup>
import { previewVideo } from 'element-plus-x'
import type { VideoViewerProps } from 'element-plus-x'

const handleClick = (index) => {
  previewVideo({
    initialIndex: index,
    urlList: [
      {
        src: 'https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-05-21/659fa31d-dc87-4882-8be5-1fba8fb7e6ff/flower.mp4',
        poster:
          'https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-05-21/659fa31d-dc87-4882-8be5-1fba8fb7e6ff/flower.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast',
      },
      {
        src: 'https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-22-19/ab77e3d0-8933-4746-94af-bb66f6e58d38/视频.mp4',
        poster:
          'https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-22-19/ab77e3d0-8933-4746-94af-bb66f6e58d38/视频.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast',
        style: {
          maxWidth: '200px',
        },
      },
    ],
  } as VideoViewerProps)
}
</script>
