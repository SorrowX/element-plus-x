<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        required
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        :x-component-props="{
          clearable: true,
        }"
      />
      <SchemaStringField
        required
        name="textarea"
        title="文本框"
        x-decorator="FormItem"
        x-component="Input.TextArea"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { Formily } from 'element-plus-x'
import { FormProvider, createSchemaField } from '@formily/vue'
const { FormItem, Input, Submit } = Formily

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Input,
  },
})

export default {
  components: { FormProvider, ...fields, Submit },
  data() {
    return {
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
