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
        />
      </template>
    </el-bubble>
  </el-flex>
</template>
