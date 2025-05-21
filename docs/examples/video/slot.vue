<template>
  <el-flex vertical align="center">
    <el-video
      duration="10:53"
      style="max-width: 180px"
      poster="https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-22-19/ab77e3d0-8933-4746-94af-bb66f6e58d38/视频.mp4?x-oss-process=video/snapshot,t_1000,f_jpg,m_fast"
      src="https://realbot-oss.oss-accelerate.aliyuncs.com/scrm/2025/2025-22-19/ab77e3d0-8933-4746-94af-bb66f6e58d38/视频.mp4"
    >
      <template #play-icon>
        <el-icon size="42" color="#fff" class="el-video__btn">
          <VideoPlayer />
        </el-icon>
      </template>
    </el-video>
  </el-flex>
</template>

<script lang="ts" setup>
import { IconsVue } from 'element-plus-x'
const { VideoPlayer } = IconsVue
</script>
