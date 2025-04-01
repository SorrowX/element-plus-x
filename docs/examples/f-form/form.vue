<template>
  <Form
    :form="form"
    :label-col="6"
    :wrapper-col="10"
    @auto-submit="log"
    @auto-submit-failed="log"
  >
    <SchemaField>
      <SchemaStringField
        name="input"
        title="输入框"
        x-decorator="FormItem"
        x-component="Input"
        :x-component-props="{
          clearable: true,
        }"
        :required="true"
      />
      <SchemaStringField
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          clearable: true,
        }"
        :enum="[
          {
            label: '选项1',
            value: 1,
          },
          {
            label: '选项2',
            value: 2,
          },
        ]"
        :required="true"
      />
    </SchemaField>
    <FormButtonGroup align-form-item>
      <Submit>提交</Submit>
    </FormButtonGroup>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Form, FormButtonGroup, FormItem, Input, Select, Submit } = Formily

const form = createForm()
const fields = createSchemaField({ components: { Input, Select, FormItem } })

export default {
  components: { FormButtonGroup, Submit, Form, ...fields },
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
