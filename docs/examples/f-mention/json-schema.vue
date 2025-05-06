<template>
  <Form :form="form" :label-width="100">
    <SchemaField :schema="schema" />
    <FormButtonGroup align-form-item>
      <Reset force-clear>重置</Reset>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Form, FormItem, Mention, Reset, Submit, FormButtonGroup } = Formily

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

const schema = {
  type: 'object',
  properties: {
    input: {
      required: true,
      type: 'string',
      title: '基础用法',
      'x-decorator': 'FormItem',
      'x-component': 'Mention',
      'x-component-props': {
        clearable: true,
        options: options.value,
      },
      default: '@',
    },
    textarea: {
      required: true,
      type: 'string',
      title: 'Textarea',
      'x-decorator': 'FormItem',
      'x-component': 'Mention',
      'x-component-props': {
        type: 'textarea',
        prefix: '/',
      },
      enum: options.value,
      default: '/',
    },
  },
}

const form = createForm()
const { SchemaField } = createSchemaField({
  components: {
    FormItem,
    Mention,
  },
})

const log = (value) => {
  console.log(value)
}
</script>
