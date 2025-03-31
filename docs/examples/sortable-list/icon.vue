<template>
  <el-sortable-list
    v-model="list"
    class="sortable-list"
    :options="{
      handle: '.handle',
      animation: 300,
    }"
  >
    <template #default="{ data }">
      <div :key="data.id" class="sortable-list-item">
        <el-icon class="handle"><Rank /></el-icon>
        <span>{{ data.name }}</span>
      </div>
    </template>
  </el-sortable-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElIcon } from 'element-plus'
import { Rank } from '@element-plus/icons-vue'

const list = ref([
  { id: 1, name: 'a' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 4, name: 'd' },
  { id: 5, name: 'e' },
])
</script>

<style scoped lang="scss">
.sortable-list {
  max-width: 500px;
}
.sortable-list-item {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  padding: 0 16px;
  .handle {
    display: inline-block;
    margin-right: 16px;
    cursor: pointer;
  }
}
</style>
