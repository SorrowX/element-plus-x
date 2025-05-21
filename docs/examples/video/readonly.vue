<template>
  <el-flex vertical align="center">
    <el-video
      readonly
      duration="10:53"
      style="max-width: 180px"
      poster="https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-22-19/ab77e3d0-8933-4746-94af-bb66f6e58d38/视频.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
      @click="handleClick"
    />
  </el-flex>
</template>

<script lang="ts" setup>
const handleClick = () => {
  console.log('自行处理播放逻辑')
}
</script>
