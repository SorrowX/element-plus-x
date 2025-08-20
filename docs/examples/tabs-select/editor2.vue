<template>
  <el-editor
    ref="editor"
    v-model="html"
    resize
    class="editor"
    prefix="/"
    disable-enter-emit
    style="margin-bottom: 12px"
    placeholder="请输入/试试"
    :tooltip-props="{ popperClass: 'popper-class' }"
  >
    <template #content="{ insertContentAt }">
      <el-tabs-select-panel
        v-model="select"
        v-model:tab="tab"
        :tabs="tabs"
        :border="false"
        value-key="value"
        @change="(data) => handleChange(data, insertContentAt)"
      />
    </template>
  </el-editor>

  <el-button @click="getText"> 获取纯文本内容 </el-button>

  <pre>{{ text }}</pre>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getTextContent } from 'element-plus-x'

const html = ref()
const tab = ref('1')
const select = ref()
const editor = ref()
const text = ref()

const handleChange = (data, insertContentAt) => {
  select.value = ''

  insertContentAt(
    ` <tag disable-transitions id="${data.value}" class="tag" text="{{ ${data.label} }}"></tag> `
  )
}

function getText() {
  text.value = getTextContent(editor.value.getHtml(), [
    {
      tag: 'tag',
      attr: 'id',
    },
  ])
}

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
  {
    title: '列表展示',
    id: '2',
    type: 'option',
    options: [
      {
        label: '当前北京时间',
        value: 'time',
      },
      {
        label: 'SOP开始时间',
        value: 'sop',
      },
    ],
  },
  {
    title: '树形展示',
    id: '3',
    type: 'option',
    options: [
      {
        label: 'Vip客户',
        value: 'vip',
        children: [
          {
            label: '客户1',
            value: 'vip-customer1',
          },
          {
            label: '客户2',
            value: 'vip-customer2',
          },
        ],
      },
      {
        label: '普通客户',
        value: 'general',
        children: [
          {
            label: '普通-客户1',
            value: 'general-customer1',
          },
          {
            label: '普通-客户2',
            value: 'general-customer2',
          },
        ],
      },
    ],
  },
  {
    title: '异步数据',
    id: '4',
    type: 'option',
    options: [],
  },
])

// 模拟异步接口请求，更新数据源
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
}, 1000)
</script>

<style lang="scss">
.editor {
  max-width: 450px;
  min-height: 80px;
  max-height: 250px;
  line-height: 26px;
}
.popper-class {
  & .el-editor-mention-wrap {
    height: auto !important;
  }
}
</style>
