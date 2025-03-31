<template>
  <el-dialog-v2
    width="500"
    title="标题"
    :trigger-props="{
      triggerText: 'Click me',
    }"
    :cancel-props="{
      hidden: true,
    }"
    :sure-props="{
      sureText: '好，我知道了',
      plain: true,
      style: { padding: '0px 26px' },
    }"
  >
    <div style="padding: 16px">hello word</div>
  </el-dialog-v2>
</template>
