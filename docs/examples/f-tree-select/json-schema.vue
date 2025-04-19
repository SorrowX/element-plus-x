<template>
  <Form :form="form" label-width="120" @auto-submit="onSubmit">
    <SchemaField :schema="schema" />
    <Submit>提交</Submit>
  </Form>
</template>

<script setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { TreeSelect, Form, FormItem, Submit } = Formily

const data = [
  {
    value: '1',
    label: 'Level one 1',
    disabled: true,
    children: [
      {
        value: '1-1',
        label: 'Level two 1-1',
        disabled: true,
        children: [
          {
            disabled: true,
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
]

const renderContent = (h, { data }) => {
  return h(
    'span',
    {
      style: {
        color: '#626AEF',
      },
    },
    `${data.label}[${data.value}]`
  )
}

const schema = {
  type: 'object',
  properties: {
    select: {
      type: 'string',
      title: '同步数据源',
      required: true,
      enum: data,
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      'x-component-props': {
        style: {
          width: '320px',
        },
      },
    },
    select2: {
      type: 'string',
      title: '自定义内容',
      required: true,
      enum: data,
      'x-decorator': 'FormItem',
      'x-component': 'TreeSelect',
      'x-component-props': {
        style: {
          width: '320px',
        },
        renderContent,
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    TreeSelect,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
