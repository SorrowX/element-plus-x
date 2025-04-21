<template>
  <Form :form="form" label-width="120" @auto-submit="onSubmit">
    <SchemaField :schema="schema" />
    <Submit>提交</Submit>
    <Reset>重置</Reset>
  </Form>
</template>

<script setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { SelectV2, Form, FormItem, Submit, Reset } = Formily

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))

const schema = {
  type: 'object',
  properties: {
    select: {
      type: 'array',
      title: '多选折叠',
      required: true,
      enum: options,
      'x-decorator': 'FormItem',
      'x-component': 'SelectV2',
      'x-component-props': {
        style: {
          width: '320px',
        },
        multiple: true,
        collapseTags: true,
        collapseTagsTooltip: true,
      },
    },
    select2: {
      type: 'array',
      title: '创建临时选项',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'SelectV2',
      'x-component-props': {
        style: {
          width: '320px',
        },
        allowCreate: true,
        filterable: true,
        multiple: true,
        clearable: true,
        reserveKeyword: false,
      },
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    SelectV2,
  },
})

const onSubmit = (value) => {
  console.log(value)
}
</script>
