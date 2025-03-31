<template>
  <el-card class="dropdown-v2-card">
    <el-dropdown-v2
      width="110"
      :options="options"
      :tooltip-options="tooltipOptions"
      @change="handleChange"
    >
      <div class="icon-wrapper">
        <el-icon><MoreFilled /></el-icon>
      </div>
    </el-dropdown-v2>
  </el-card>
</template>

<script lang="ts" setup>
import { ElIcon } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'

const handleChange = (value, valuePath) => {
  console.log(value, valuePath)
}

const tooltipOptions = {
  offset: 8,
  showArrow: true,
  placement: 'bottom-start',
}

const options = [
  {
    label: '编辑',
    value: 'edit',
  },
  {
    label: '删除',
    value: 'del',
  },
  {
    label: '复制',
    value: 'copy',
    disabled: true,
    children: [
      {
        label: '该节点',
        value: 'node1',
      },
      {
        label: '该节点以下',
        value: 'node2',
      },
    ],
  },
  {
    label: '黏贴到同级',
    value: 'paste',
  },
]
</script>

<style lang="scss" scoped>
.dropdown-v2-card {
  width: 260px;
  height: 140px;
  display: flex;
  justify-content: flex-end;
  .icon-wrapper {
    width: 40px;
    display: flex;
    justify-content: center;
    i {
      cursor: pointer;
    }
  }
}
</style>
