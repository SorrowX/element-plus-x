<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180">
      <template #default="scope">
        <el-dot type="primary">
          <el-text>{{ scope.row.date }}</el-text>
        </el-dot>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Name" width="180">
      <template #default="scope">
        <el-dot type="success">
          <el-text>{{ scope.row.name }}</el-text>
        </el-dot>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="Address">
      <template #default="scope">
        <el-dot type="danger">
          <el-text>{{ scope.row.address }}</el-text>
        </el-dot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
