<template>
  <div style="height: 500px; overflow: auto">
    <JsonSchema
      label-width="140"
      :schema="schema"
      :i-form-props="formProps"
      :components="components"
      preview-text-placeholder="当没有值的时候会显示这个文本"
    />
  </div>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { Formily } from 'element-plus-x'
import { Search } from '@element-plus/icons-vue'
const { JsonSchema } = Formily

const onSubmit = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(value)
      return resolve(value)
    }, 1000)
  })
}

const onReset = () => {
  console.log('重置')
}

const formProps = {
  initialValues: {
    input: '123',
  },
}

const CustomComp = {
  name: 'CustomComp',
  setup(props, { attrs, slots }) {
    return () => {
      return h('div', {}, [h('span', '我是自定义组件，嵌入到JsonSchema中')])
    }
  },
}

const components = {
  CustomComp,
}

const schema = {
  type: 'object',
  properties: {
    customComp: {
      type: 'string',
      title: '自定义组件',
      'x-decorator': 'FormItem',
      'x-component': 'CustomComp',
      'x-component-props': {
        style: {
          width: '320px',
        },
      },
    },
    input: {
      required: true,
      type: 'string',
      title: '输入框',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        style: {
          width: '320px',
        },
      },
    },
    inputNumber: {
      required: true,
      type: 'number',
      title: '数字',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        style: {
          width: '320px',
        },
      },
    },
    select: {
      required: true,
      type: 'array',
      title: '选择框',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          width: '320px',
        },
        multiple: true,
        clearable: true,
      },
      enum: ['选项一', '选项二'],
    },
    datePicker: {
      required: true,
      type: 'string',
      title: '日期',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
      'x-component-props': {
        style: {
          width: '320px',
        },
      },
    },
    timePicker: {
      required: true,
      type: 'string',
      title: '时间',
      'x-decorator': 'FormItem',
      'x-component': 'TimePicker',
      'x-component-props': {
        style: {
          width: '320px',
        },
      },
    },
    radio: {
      required: true,
      type: 'string',
      title: '单选框',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {},
      enum: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ],
    },
    radio1: {
      required: true,
      type: 'string',
      title: '单选框',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        options: ['选项1', '选项2'],
      },
    },
    checkbox: {
      required: true,
      type: 'array',
      title: '复选框',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
      'x-component-props': {},
      enum: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
      ],
    },
    checkbox1: {
      required: true,
      type: 'array',
      title: '复选框',
      'x-decorator': 'FormItem',
      'x-component': 'Checkbox.Group',
      'x-component-props': {
        options: ['选项1', '选项2'],
      },
    },
    switch: {
      type: 'boolean',
      title: '开关',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
    },
    textArea: {
      type: 'boolean',
      title: '文本框',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        style: {
          width: '320px',
        },
      },
    },
    actions: {
      type: 'void',
      title: ' ',
      'x-decorator': 'FormItem',
      'x-component': 'Actions',
      'x-component-props': {
        submitText: '提交',
        resetText: '重置',
        submitProps: {
          icon: Search,
          scrollToError: true,
        },
        onSubmit,
        onReset,
      },
    },
  },
}
</script>
