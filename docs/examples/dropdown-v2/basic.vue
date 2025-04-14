<template>
  <el-space>
    <el-dropdown-v2
      trigger="hover"
      :options="options"
      :trigger-props="{ triggerText: 'Hover Me' }"
      @change="handleChange"
    />
    <el-dropdown-v2
      split-button
      trigger="hover"
      :options="options"
      :trigger-props="{ triggerText: 'Hover Icon' }"
      @change="handleChange"
    />
    <el-dropdown-v2
      trigger="click"
      :options="options"
      :trigger-props="{ triggerText: 'Click Me' }"
      @change="handleChange"
    />
    <el-dropdown-v2
      trigger="click"
      split-button
      :options="options"
      :trigger-props="{ triggerText: 'Click Icon', type: '' }"
      @change="handleChange"
    />
  </el-space>
</template>

<script lang="ts" setup>
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
    disabled: true,
  },
  {
    label: '选项三',
    value: '3',
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
