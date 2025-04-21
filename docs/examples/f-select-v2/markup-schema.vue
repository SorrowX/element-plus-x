<template>
  <Form :form="form" @auto-submit="onSubmit">
    <SchemaField>
      <SchemaStringField
        name="select"
        title="基本使用"
        :required="true"
        x-decorator="FormItem"
        x-component="SelectV2"
        :x-component-props="{
          style: {
            width: '320px',
          },
          clearable: true,
        }"
        :enum="options"
      />
    </SchemaField>

    <Submit>提交</Submit>
  </Form>
</template>

<script setup>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { SelectV2, Form, FormItem, Submit } = Formily

const form = createForm({
  effects: () => {},
})

const fields = createSchemaField({
  components: {
    FormItem,
    SelectV2,
  },
})
const { SchemaField, SchemaStringField } = fields

const onSubmit = (value) => {
  console.log(value)
}

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>
