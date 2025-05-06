<template>
  <FormProvider :form="form">
    <FormLayout :label-width="100">
      <SchemaField>
        <SchemaStringField
          required
          name="input"
          title="基础用法"
          x-decorator="FormItem"
          x-component="Mention"
          :x-component-props="{
            clearable: true,
          }"
          default="@"
          :enum="options"
        />
        <SchemaStringField
          required
          name="textarea"
          title="Textarea"
          x-decorator="FormItem"
          x-component="Mention"
          :x-component-props="{
            type: 'textarea',
            options: options,
            prefix: '/',
          }"
          default="/"
        />
      </SchemaField>
      <FormButtonGroup align-form-item>
        <Reset force-clear>重置</Reset>
        <Submit @submit="log">提交</Submit>
      </FormButtonGroup>
    </FormLayout>
  </FormProvider>
</template>

<script setup>
import { ref } from 'vue'
import { createForm } from '@formily/core'
import { Formily } from 'element-plus-x'
import { FormProvider, createSchemaField } from '@formily/vue'
const { FormLayout, FormItem, Mention, Submit, Reset, FormButtonGroup } =
  Formily

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Mention,
  },
})
const { SchemaField, SchemaStringField } = fields

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
