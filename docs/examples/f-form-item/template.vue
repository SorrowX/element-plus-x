<template>
  <Form :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[Input]"
      required
    />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Form, FormItem, Input, Submit } = Formily

const form = createForm()

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      FormItem,
      Input,
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
