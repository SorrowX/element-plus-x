<template>
  <JsonSchema
    ref="jsonSchemaRef"
    label-width="100"
    wrapper-width="320"
    feedback-layout="terse"
    :schema="schema"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Formily } from 'element-plus-x'
import { Refresh, Search } from '@element-plus/icons-vue'
const { JsonSchema } = Formily

const jsonSchemaRef = ref()

const onSubmit = (value) => {
  ElMessage(JSON.stringify(value, null, 2))
}

const onReset = (value) => {
  ElMessage.warning(JSON.stringify(value, null, 2))
}

const options = [
  {
    value: '1',
    label: 'Level one 1',
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        children: [
          {
            value: '1-1-1',
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
]

const schema = {
  type: 'object',
  properties: {
    layout: {
      type: 'void',
      'x-component': 'Space',
      'x-component-props': {
        wrap: true,
        size: 0,
      },
      properties: {
        input: {
          type: 'string',
          title: '输入框',
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '请输入',
          },
        },
        inputNumber: {
          type: 'number',
          title: '数字',
          'x-decorator': 'FormItem',
          'x-component': 'InputNumber',
          'x-component-props': {
            style: {
              width: '100%',
            },
            placeholder: '0',
          },
        },
        select: {
          type: 'string',
          title: '下拉选择',
          'x-decorator': 'FormItem',
          'x-component': 'Select',
          'x-component-props': {
            clearable: true,
          },
          enum: ['选项一', '选项二'],
        },
        tree: {
          type: 'string',
          title: '树形选择',
          enum: options,
          'x-decorator': 'FormItem',
          'x-component': 'TreeSelect',
          'x-component-props': {
            clearable: true,
          },
        },
        cascader: {
          type: 'string',
          title: '级联选择',
          enum: options,
          'x-decorator': 'FormItem',
          'x-component': 'Cascader',
          'x-component-props': {
            clearable: true,
            style: {
              width: '100%',
            },
          },
        },
        datePicker: {
          type: 'string',
          title: '选择日期',
          'x-decorator': 'FormItem',
          'x-component': 'DatePicker',
          'x-component-props': {
            style: {
              width: '100%',
            },
            placeholder: '请选择',
          },
        },
        timePicker: {
          type: 'string',
          title: '时间',
          'x-decorator': 'FormItem',
          'x-component': 'TimePicker',
          'x-component-props': {
            style: {
              width: '100%',
            },
            placeholder: '请选择',
          },
        },
        actions: {
          type: 'void',
          title: ' ',
          'x-decorator': 'FormItem',
          'x-component': 'Actions',
          'x-component-props': {
            submitText: '搜索',
            resetText: '重置',
            submitProps: {
              icon: Search,
            },
            resetProps: {
              icon: Refresh,
              forceClear: true,
            },
            onSubmit,
            onReset,
          },
        },
      },
    },
  },
}
</script>
