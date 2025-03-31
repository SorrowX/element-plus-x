<template>
  <el-sortable-list v-model="list" class="sortable-list">
    <template #default="{ data }">
      <div :key="data.id" class="sortable-list-item">{{ data.name }}</div>
    </template>
  </el-sortable-list>
  <!-- <pre>{{ list }}</pre> -->
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const list = ref([
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 4, name: 'd' },
  { id: 5, name: 'e' },
])
</script>

<style scoped>
.sortable-list {
  max-width: 500px;
}
.sortable-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
