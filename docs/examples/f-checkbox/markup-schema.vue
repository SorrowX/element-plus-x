<template>
  <Form :form="form">
    <SchemaField>
      <SchemaBooleanField
        name="single1"
        title="是否确认"
        x-decorator="FormItem"
        x-component="Checkbox"
      />
      <SchemaBooleanField
        name="single2"
        title="独立使用"
        x-decorator="FormItem"
        x-component="Checkbox"
        :x-component-props="{
          label: 'option1',
          trueValue: 1,
          falseValue: 0,
        }"
      />
      <SchemaArrayField
        name="multiple1"
        title="复选"
        :enum="[
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ]"
        x-decorator="FormItem"
        x-component="Checkbox.Group"
      />
      <SchemaArrayField
        name="multiple2"
        title="禁用"
        :enum="[
          { label: '选项1', value: 1, disabled: true },
          { label: '选项2', value: 2 },
        ]"
        x-decorator="FormItem"
        x-component="Checkbox.Group"
      />
      <SchemaArrayField
        name="multiple3"
        title="按钮"
        :enum="[
          { label: '选项1', value: 1 },
          { label: '选项2', value: 2 },
        ]"
        x-decorator="FormItem"
        x-component="Checkbox.Group"
        :x-component-props="{
          optionType: 'button',
        }"
      />
      <SchemaArrayField
        name="multiple4"
        title="边框"
        :enum="[
          { label: '选项1', value: 1, border: true },
          { label: '选项2', value: 2, border: true },
        ]"
        x-decorator="FormItem"
        x-component="Checkbox.Group"
      />
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Checkbox, Form, FormItem, Submit } = Formily

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Checkbox,
  },
})

export default {
  components: { Form, ...fields, Submit },
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
