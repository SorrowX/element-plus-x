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
      :colon="true"
      label-width="120"
      wrapper-width="400"
      :schema="schema"
      :i-form-props="formProps"
      preview-text-placeholder="当没有值的时候会显示这个文本"
    />
    <!-- <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
      @change="handle"
    /> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onFormMount } from '@formily/core'
import { Formily } from 'element-plus-x'
const { JsonSchema } = Formily

const value1 = ref('2024/07/23')
const handle = (value) => {
  console.log('Date changed:', value)
}

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

const options = ref([
  {
    label: 'Fuphoenixes',
    value: 'Fuphoenixes',
  },
  {
    label: 'kooriookami',
    value: 'kooriookami',
  },
  {
    label: 'Jeremy',
    value: 'Jeremy',
  },
  {
    label: 'btea',
    value: 'btea',
  },
])

const formProps = ref({
  readPretty: false,
  initialValues: {},
  effects() {
    onFormMount((form) => {
      getData().then((data) => {
        form.query(/(cascader|tree)/).forEach((field: any) => {
          field.setDataSource?.(data)
        })
      })
    })
  },
})

const schema = {
  type: 'object',
  properties: {
    // input: {
    //   required: true,
    //   type: 'string',
    //   title: '输入框',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input',
    //   'x-component-props': {},
    //   default: 'Summer',
    // },
    // mention: {
    //   required: true,
    //   type: 'string',
    //   title: '提及',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Mention',
    //   'x-component-props': {},
    //   default: '@',
    //   enum: options.value,
    // },
    // inputNumber: {
    //   required: true,
    //   type: 'number',
    //   title: '数字',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'InputNumber',
    //   'x-component-props': {},
    //   default: 10,
    // },
    // select: {
    //   required: true,
    //   type: 'array',
    //   title: '选择框',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Select',
    //   'x-component-props': {
    //     multiple: false,
    //     clearable: true,
    //     displayType: 'text',
    //     separator: '、',
    //     onChange() {
    //       console.log('select change')
    //     },
    //   },
    //   enum: ['选项一', '选项二'],
    //   default: ['选项一', '选项二', 'sfsfd'],
    // },
    // select2: {
    //   type: 'array',
    //   title: '虚拟选择器',
    //   required: true,
    //   enum: [
    //     { label: '选项1', value: 1 },
    //     { label: '选项2', value: 2 },
    //   ],
    //   'x-decorator': 'FormItem',
    //   'x-component': 'SelectV2',
    //   'x-component-props': {
    //     multiple: true,
    //     collapseTags: true,
    //     collapseTagsTooltip: true,
    //   },
    //   default: [1],
    // },
    // tree: {
    //   required: true,
    //   type: 'string',
    //   title: '树形选择',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'TreeSelect',
    //   'x-component-props': {
    //     clearable: true,
    //     displayType: 'text',
    //   },
    //   default: '1-1-1',
    // },
    // cascader: {
    //   required: true,
    //   type: 'string',
    //   title: '级联选择',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Cascader',
    //   'x-component-props': {
    //     clearable: true,
    //     style: {
    //       width: '100%',
    //     },
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
          width: '100%',
        },
        validateEvent: false,
        '@change': function () {
          console.log('datePicker change')
        },
      },
      default: '2024/07/23',
    },
    // timePicker: {
    //   required: true,
    //   type: 'string',
    //   title: '时间',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'TimePicker',
    //   'x-component-props': {
    //     style: {
    //       width: '100%',
    //     },
    //   },
    //   default: '2024/07/23 15:27:10',
    // },
    // radio: {
    //   required: true,
    //   type: 'string',
    //   title: '单选框',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   'x-component-props': {
    //     displayType: 'text',
    //     separator: '、',
    //   },
    //   enum: [
    //     {
    //       label: '选项1',
    //       value: 1,
    //     },
    //     {
    //       label: '选项2',
    //       value: 2,
    //     },
    //   ],
    //   default: 1,
    // },
    // radio2: {
    //   required: true,
    //   type: 'string',
    //   title: '单选框2',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   'x-component-props': {
    //     options: ['选项1', '选项2'],
    //   },
    //   default: '选项2',
    // },
    // checkbox: {
    //   required: true,
    //   type: 'array',
    //   title: '复选框',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Checkbox.Group',
    //   'x-component-props': {
    //     displayType: 'text',
    //   },
    //   enum: [
    //     {
    //       label: '选项1',
    //       value: 1,
    //     },
    //     {
    //       label: '选项2',
    //       value: 2,
    //     },
    //   ],
    //   default: [1, 2],
    // },
    // checkbox2: {
    //   required: true,
    //   type: 'array',
    //   title: '复选框2',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Checkbox.Group',
    //   'x-component-props': {
    //     options: ['选项1', '选项2'],
    //   },
    //   default: ['选项1'],
    // },
    // switch: {
    //   type: 'boolean',
    //   title: '开关',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   'x-component-props': {
    //     activeValue: 1,
    //     inactiveValue: 0,
    //     activeText: '启用',
    //     inactiveText: '禁用',
    //   },
    //   default: 0,
    // },
    // textArea: {
    //   required: true,
    //   type: 'boolean',
    //   title: '文本框',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Input.TextArea',
    //   'x-component-props': {},
    //   default: 'hi 你好啊',
    // },
    // slider: {
    //   type: 'number',
    //   title: '滑块',
    //   required: true,
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Slider',
    //   'x-component-props': {
    //     style: {
    //       margin: '0 4px',
    //     },
    //     showStops: true,
    //     step: 10,
    //   },
    //   default: 10,
    // },
    // actions: {
    //   type: 'void',
    //   title: ' ',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Actions',
    //   'x-decorator-props': {
    //     colon: false,
    //   },
    //   'x-component-props': {
    //     submitText: '提交',
    //     resetText: '重置',
    //     resetProps: {
    //       forceClear: true,
    //     },
    //     onSubmit,
    //   },
    // },
  },
}
</script>
