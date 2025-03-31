<template>
  <el-load-more status="more" />
  <el-load-more status="loading" />
  <el-load-more status="noMore" />
  <el-load-more status="error" @click="handleClick" />
</template>

<script lang="ts" setup>
const handleClick = (status: string) => {
  console.log(status)
}
</script>
