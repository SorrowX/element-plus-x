<template>
  <el-editor
    v-model="html"
    class="editor"
    resize
    placeholder="Please input"
    :options="[{ label: '标签', value: 'tag' }]"
  >
    <template #content>
      <el-tabs-select-panel
        v-model="value"
        v-model:tab="tab"
        :tabs="tabs"
        :border="false"
        style="max-width: 340px"
      />
    </template>
  </el-editor>
  <pre>{{ value }}</pre>
</template>

<script setup>
import { ref } from 'vue'

const html = ref()

const tab = ref('1')
const value = ref('tag2')

const tabs = ref([
  {
    title: '节点',
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
  {
    title: '通用',
    id: '2',
    type: 'option',
    options: [
      {
        label: '当前北京时间1',
        value: 'time',
      },
      {
        label: 'SOP开始时间',
        value: 'sop',
      },
    ],
  },
  {
    title: '客户信息',
    id: '3',
    type: 'option',
    options: [
      {
        label: '11',
        value: '11',
      },
    ],
  },
  {
    title: '客户标签',
    id: '4',
    type: 'option',
    options: [],
  },
])

setTimeout(() => {
  tabs.value[3].options = [
    {
      label: '标签1',
      value: 'tag1',
    },
    {
      label: '标签2',
      value: 'tag2',
    },
  ]
}, 2000)
</script>

<style lang="scss" scoped>
.editor {
  max-width: 450px;
  min-height: 80px;
  max-height: 250px;
}
</style>
