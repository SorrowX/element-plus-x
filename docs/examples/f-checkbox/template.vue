<template>
  <Form :form="form">
    <Field
      name="single"
      title="是否确认"
      :decorator="[FormItem]"
      :component="[Checkbox]"
    />
    <ArrayField
      name="multiple"
      title="复选"
      :data-source="[
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
      ]"
      :decorator="[FormItem]"
      :component="[Checkbox.Group, { optionType: 'button' }]"
    >
      <template #option="{ option }">
        <div>#_{{ option.label }}</div>
      </template>
    </ArrayField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { ArrayField, Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Form, FormItem, Checkbox, Submit } = Formily

const form = createForm()

export default {
  components: { Form, Field, ArrayField, Submit },
  data() {
    return {
      FormItem,
      Checkbox,
      form,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
