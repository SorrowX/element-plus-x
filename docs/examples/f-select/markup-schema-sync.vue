<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        required
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          style: {
            width: '240px',
          },
          clearable: true,
          onChange: (e) => {
            console.log('change')
          },
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
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { FormItem, Select, Submit } = Formily

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Select,
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
