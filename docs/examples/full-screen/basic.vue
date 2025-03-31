<template>
  <el-full-screen v-slot="{ toggle }">
    <el-button @click="() => toggle()">toggle</el-button>

    <el-flex style="margin-top: 24px">
      <el-space size="large">
        <el-text type="info">正常元素</el-text>

        <el-tooltip content="tooltip">
          <el-text type="success">tooltip</el-text>
        </el-tooltip>

        <el-popover
          placement="bottom"
          title="Title"
          :width="200"
          content="popover"
        >
          <template #reference>
            <el-text type="success">popover</el-text>
          </template>
        </el-popover>
      </el-space>
    </el-flex>
  </el-full-screen>
</template>
