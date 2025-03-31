<template>
  <el-drawer-v2
    size="500"
    title="标题"
    :trigger-props="{
      triggerText: 'Click me',
    }"
  >
    <div style="padding: 16px">hello word</div>
    <template #footer>
      <i />
    </template>
  </el-drawer-v2>
</template>
