<template>
  <Form :form="form" :colon="false" @auto-submit="onSubmit">
    <SchemaField>
      <SchemaNumberField
        name="slider"
        title="基本使用"
        :required="false"
        x-decorator="FormItem"
        x-component="Slider"
        :x-component-props="{
          style: {
            width: '320px',
            marginLeft: '16px',
          },
          clearable: true,
        }"
        :default="10"
      />
    </SchemaField>

    <Submit>提交</Submit>
  </Form>
</template>

<script setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Slider, Form, FormItem, Submit } = Formily

const form = createForm({
  effects: () => {},
})

const fields = createSchemaField({
  components: {
    FormItem,
    Slider,
  },
})
const { SchemaField, SchemaNumberField } = fields

const onSubmit = (value) => {
  console.log(value)
}
</script>
