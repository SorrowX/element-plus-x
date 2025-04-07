<template>
  <div>
    <el-switch
      v-model="switchValue"
      size="large"
      active-text="阅读态"
      inactive-text="编辑"
      @change="handleChange"
    />
    <JsonSchema
      ref="jsonSchemaRef"
      :schema="schema"
      :i-form-props="formProps"
      preview-text-placeholder="当没有值的时候会显示这个文本"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onFormMount } from '@formily/core'
import { Formily } from 'element-plus-x'
const { JsonSchema } = Formily

const switchValue = ref(false)
const jsonSchemaRef = ref()

const handleChange = (value) => {
  jsonSchemaRef.value.formInstance.setPattern(value ? 'readPretty' : 'editable')
}

const onSubmit = (value) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(value)
      return resolve(value)
    }, 1000)
  })
}

const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve([
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
        {
          value: '2',
          label: 'Level one 2',
          children: [
            {
              value: '2-1',
              label: 'Level two 2-1',
              children: [
                {
                  value: '2-1-1',
                  label: 'Level three 2-1-1',
                },
              ],
            },
            {
              value: '2-2',
              label: 'Level two 2-2',
              children: [
                {
                  value: '2-2-1',
                  label: 'Level three 2-2-1',
                },
              ],
            },
          ],
        },
        {
          value: '3',
          label: 'Level one 3',
          children: [
            {
              value: '3-1',
              label: 'Level two 3-1',
              children: [
                {
                  value: '3-1-1',
                  label: 'Level three 3-1-1',
                },
              ],
            },
            {
              value: '3-2',
              label: 'Level two 3-2',
              children: [
                {
                  value: '3-2-1',
                  label: 'Level three 3-2-1',
                },
              ],
            },
          ],
        },
      ])
    }, 1000)
  })
}

const formProps = ref({
  readPretty: false,
  initialValues: {},
  effects() {
    onFormMount((form) => {
      console.log('一次')
      getData().then((data) => {
        form.query('tree').forEach((field: any) => {
          field.setDataSource?.(data)
        })
      })
    })
  },
})

const schema = {
  type: 'object',
  properties: {
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
      default: 10,
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
      default: ['选项一', '选项二', 'sfsfd'],
    },
    // tree: {
    //   required: true,
    //   type: 'string',
    //   title: '树形选择',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'TreeSelect',
    //   'x-component-props': {
    //     style: {
    //       width: '320px',
    //     },
    //     clearable: true,
    //   },
    //   default: '1-1-1',
    // },
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
      default: '2024/07/23',
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
      default: '2024/07/23 15:27:10',
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
      default: 1,
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
      default: '选项2',
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
      default: [1, 2],
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
      default: ['选项1'],
    },
    switch: {
      type: 'boolean',
      title: '开关',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      'x-component-props': {
        activeValue: 1,
        inactiveValue: 0,
        activeText: '启用',
        inactiveText: '禁用',
      },
      default: 0,
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
      default: 'hi 你好啊',
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
          // icon: Search,
        },
        onSubmit,
      },
    },
  },
}
</script>
