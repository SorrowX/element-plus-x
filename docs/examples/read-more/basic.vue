<template>
  <el-read-more v-model="collapse" height="305px">
    <p
      v-for="item in 8"
      :key="item"
      class="scrollbar-demo-item ep-bg-purple-light"
    >
      {{ item }}
    </p>
  </el-read-more>
</template>

<script setup>
import { ref } from 'vue'
const collapse = ref(true)
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  color: #409eff;
}
</style>
