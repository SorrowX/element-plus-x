<template>
  <el-dropdown-v2
    width="180"
    trigger="click"
    :options="options"
    :trigger-props="{ triggerText: 'Click Me' }"
    @change="handleChange"
  >
    <template #label="{ label, value, disabled, children }">
      <div v-if="children?.length" class="el-dropdown-v2-item">
        <div>
          {{ label }}-{{ value }}-{{ disabled }}-childs:{{ children.length }}
        </div>
      </div>
      <div v-else>{{ label }}-{{ value }}-{{ disabled }}</div>
    </template>
  </el-dropdown-v2>
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
