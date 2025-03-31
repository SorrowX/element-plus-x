<template>
  <el-drawer-v2
    size="500"
    title="标题"
    direction="ltr"
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
    <div style="padding: 16px">hello drawer</div>
  </el-drawer-v2>
</template>
