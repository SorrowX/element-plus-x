<template>
  <el-contextmenu :options="options" @change="handleChange">
    <div class="contextmenu__content">右击试试-{{ value }}</div>
  </el-contextmenu>
</template>

<script setup>
import { ref } from 'vue'
const value = ref()

const options = [
  {
    value: 'guide',
    label: 'Guide',
  },
  {
    value: 'component',
    label: 'Component',
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const handleChange = (val) => {
  value.value = val
}
</script>

<style lang="scss">
.contextmenu {
  &__content {
    width: 400px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
</style>
