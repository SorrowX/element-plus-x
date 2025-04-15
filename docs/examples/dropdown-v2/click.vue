<template>
  <el-dropdown-v2
    width="100"
    trigger="click"
    :options="options"
    @change="handleChange"
  >
    <el-button type="primary">
      Click Me<el-icon class="el-icon--right"><CaretBottom /></el-icon>
    </el-button>
  </el-dropdown-v2>
</template>

<script lang="ts" setup>
import { ElButton, ElIcon } from 'element-plus'
import { CaretBottom } from '@element-plus/icons-vue'

const handleChange = (value, valuePath) => {
  console.log(value, valuePath)
}

const options = [
  {
    label: '选项一',
    value: '1',
  },
  {
    label: '选项二',
    value: '2',
  },
  {
    label: '选项三',
    value: '3',
    divided: true,
    children: [
      {
        label: '子选项一',
        value: '3-1',
      },
      {
        label: '子选项二',
        value: '3-2',
      },
      {
        label: '子选项三',
        value: '3-3',
      },
    ],
  },
  {
    label: '选项四',
    value: '4',
  },
]
</script>
