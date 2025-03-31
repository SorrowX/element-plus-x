<template>
  <el-draggable-table
    border
    row-key="id"
    :data="tableData"
    style="width: 100%"
    :draggable-props="{
      handle: '.move',
    }"
    @sort-data="handleSortData"
  >
    <el-table-column prop="drag" label="" width="40" class-name="move">
      <el-icon><Rank /></el-icon>
    </el-table-column>
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-draggable-table>
</template>

<script setup>
import { Rank } from '@element-plus/icons-vue'

const tableData = [
  {
    date: '2024-08-01',
    name: 'Summer',
    address: 'No. 189, Grove St, Los Angeles',
    id: 1,
  },
  {
    date: '2024-08-02',
    name: 'Summer',
    address: 'No. 189, Grove St, Los Angeles',
    id: 2,
  },
  {
    date: '2024-08-03',
    name: 'Summer',
    address: 'No. 189, Grove St, Los Angeles',
    id: 3,
  },
  {
    date: '2024-08-04',
    name: 'Summer',
    address: 'No. 189, Grove St, Los Angeles',
    id: 4,
  },
  {
    date: '2024-08-05',
    name: 'Summer',
    address: 'No. 189, Grove St, Los Angeles',
    id: 5,
  },
]
const handleSortData = (data) => {
  console.log('排序后的数据', data)
}
</script>
