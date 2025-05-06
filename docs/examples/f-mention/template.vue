<template>
  <Form :form="form" :label-width="100" component="div">
    <Field
      required
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[Mention, { clearable: true, options }]"
    />
    <Field
      required
      name="textarea"
      title="文本框"
      :decorator="[FormItem]"
      :component="[Mention]"
      :data-source="options"
    />
    <FormButtonGroup align-form-item>
      <Reset force-clear>重置</Reset>
      <Submit @submit="log">提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script setup>
import { ref } from 'vue'
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Form, FormButtonGroup, FormItem, Mention, Submit, Reset } = Formily

const form = createForm()

const log = (value) => {
  console.log(value)
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
</script>
