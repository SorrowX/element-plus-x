<template>
  <Form :form="form" label-width="150" @auto-submit="onSubmit">
    <SchemaField :schema="schema" />
    <Submit>提交</Submit>
    <Reset>重置</Reset>
  </Form>
</template>

<script setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Slider, Form, FormItem, Submit, Reset } = Formily

const schema = {
  type: 'object',
  properties: {
    slider: {
      type: 'number',
      title: '离散值',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        style: {
          width: '360px',
          marginLeft: '12px',
        },
        showStops: true,
        step: 10,
      },
    },
    slider2: {
      type: 'number',
      title: '带有输入框的滑块',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        style: {
          width: '360px',
          marginLeft: '12px',
        },
        showInput: true,
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Slider,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
