<template>
  <el-flex vertical>
    <el-bubble shape="arrow">
      <template #avatar>
        <el-avatar style="background: rgb(191 127 78)"> 尹 </el-avatar>
      </template>
      <template #default> 你好, 徐尹啊 ! </template>
    </el-bubble>

    <el-bubble
      shape="arrow"
      placement="end"
      :content-style="{ background: '#96ec69' }"
    >
      <template #avatar>
        <el-avatar style="background: rgb(9 200 31)"> 徐 </el-avatar>
      </template>
      <template #default> 你好，天选打工人 </template>
    </el-bubble>

    <el-bubble shape="arrow">
      <template #avatar>
        <el-avatar style="background: rgb(191 127 78)"> 尹 </el-avatar>
      </template>
      <template #default> 难过(ಥ﹏ಥ) </template>
    </el-bubble>
  </el-flex>
</template>
