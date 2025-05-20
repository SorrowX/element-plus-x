<template>
  <el-video
    duration="10:53"
    style="max-width: 500px; max-height: 300px"
    poster="https://upload.wikimedia.org/wikipedia/commons/e/e8/Elephants_Dream_s5_both.jpg"
    src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
  >
    <template #default>
      <source
        src="https://archive.org/download/ElephantsDream/ed_hd.ogv"
        type="video/ogg"
      />
      <source
        src="https://archive.org/download/ElephantsDream/ed_hd.avi"
        type="video/avi"
      />
      <source
        src="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
        type="video/mp4"
      />

      抱歉，你的浏览器不支持嵌入式视频，不过不用担心，你可以
      <a
        href="https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4"
        download="ed_1024_512kb.mp4"
      >
        下载 MP4
      </a>
      并用你最喜欢的视频播放器观看！
    </template>
    <template #player>
      <el-icon size="42" color="#fff">
        <VideoPlayer />
      </el-icon>
    </template>
  </el-video>
</template>

<script lang="ts" setup>
import { IconsVue } from 'element-plus-x'
const { VideoPlayer } = IconsVue
</script>
