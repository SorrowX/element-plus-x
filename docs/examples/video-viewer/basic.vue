<template>
  <el-video-viewer teleported :url-list="list2" :initial-index="1" />
</template>

<script lang="ts" setup>
const list1 = [
  'https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-22-19/ab77e3d0-8933-4746-94af-bb66f6e58d38/视频.mp4',
  'https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-05-21/659fa31d-dc87-4882-8be5-1fba8fb7e6ff/flower.mp4',
]

const list2 = [
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
]
</script>
