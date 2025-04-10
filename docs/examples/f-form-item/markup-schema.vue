<template>
  <Form :form="form" @auto-submit="onSubmit">
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        required
      />
    </SchemaField>
    <Submit>提交</Submit>
    <Reset>重置</Reset>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Form, FormItem, Input, Submit, Reset } = Formily

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default {
  components: { Form, ...fields, Submit, Reset },
  data() {
    return {
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
