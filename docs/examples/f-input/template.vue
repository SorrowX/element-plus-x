<template>
  <FormProvider :form="form">
    <Field
      name="input"
      title="输入框"
      :decorator="[FormItem]"
      :component="[Input]"
    />
    <Field
      name="textarea"
      title="文本框"
      :decorator="[FormItem]"
      :component="[Input.TextArea]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { FormItem, Input, Submit } = Formily

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      FormItem,
      Input,
      form,
    }
  },
  methods: {
    log(value) {
      console.log(value)
    },
  },
}
</script>
