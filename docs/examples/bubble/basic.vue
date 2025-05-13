<template>
  <el-space :size="32">
    <el-bubble content="你好, 徐尹啊 !" />

    <el-bubble> 你好，天选打工人 </el-bubble>

    <el-bubble>
      <template #content> 你好，我不好 </template>
    </el-bubble>
  </el-space>
</template>
