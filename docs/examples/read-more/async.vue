<template>
  <el-read-more v-model="collapse" height="305px" :transition="false">
    <p
      v-for="item in list"
      :key="item"
      class="scrollbar-demo-item ep-bg-purple-light"
    >
      {{ item }}
    </p>
  </el-read-more>
</template>

<script setup>
import { ref } from 'vue'
const collapse = ref(false)
const list = ref(0)

setTimeout(() => {
  list.value = 8
}, 1000 * 1)
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
