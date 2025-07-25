<template>
  <!-- {{ value }} -->
  <el-tabs-select
    v-model="value"
    :tabs="tabs"
    style="width: 320px"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('tag2')

const tabs = ref([
  {
    title: '分组展示',
    id: '1',
    type: 'group',
    options: [
      {
        label: '插件',
        children: [
          {
            label: 'Output1',
            value: 'Output1',
            children: [
              {
                label: 'Output1-1',
                value: 'Output1-1',
              },
            ],
          },
          {
            label: 'Output2',
            value: 'Output2',
          },
        ],
      },
      {
        label: '大模型',
        children: [
          {
            label: 'model1',
            value: 'model1',
            children: [
              {
                label: 'model1-1',
                value: 'model1-1',
                children: [
                  {
                    label: 'model1-1-1',
                    value: 'model1-1-1',
                  },
                ],
              },
            ],
          },
          {
            label: 'model2',
            value: 'model2',
          },
        ],
      },
    ],
  },
])

const handleChange = (value, data) => {
  console.log(value, data)
}
</script>
