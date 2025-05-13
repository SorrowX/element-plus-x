<template>
  <div
    style="display: flex; flex-direction: column; gap: 12px; padding: 0 12px"
  >
    <el-bubble avatar content="shape: default" />
    <el-bubble avatar v-bind="sharedLongTextProps" />
    <el-bubble avatar content="shape: round" shape="round" />
    <el-bubble avatar v-bind="sharedLongTextProps" shape="round" />
    <el-bubble avatar content="shape: corner" shape="corner" />
    <el-bubble avatar v-bind="sharedLongTextProps" shape="corner" />
    <el-bubble avatar content="shape: arrow" shape="arrow" />
    <el-bubble avatar v-bind="sharedLongTextProps" shape="arrow" />
  </div>
</template>

<script lang="ts" setup>
const sharedLongTextProps = {
  placement: 'end',
  content:
    'This is a long text message to show the multiline view of the bubble component. '.repeat(
      3
    ),
  contentStyle: { maxWidth: '500px' },
}
</script>
