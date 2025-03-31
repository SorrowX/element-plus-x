<template>
  <el-card style="max-width: 210px" :body-style="{ padding: '12px 16px' }">
    <el-flex gap="12">
      <el-image
        fit="fill"
        style="width: 32px; height: 32px; border-radius: 6px"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      />
      <el-flex vertical gap="10">
        <el-text>image-file.png</el-text>
        <el-text type="info" style="align-self: flex-start">100KB</el-text>
      </el-flex>
    </el-flex>
  </el-card>
</template>
