<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="input1"
        title="单选"
        x-decorator="FormItem"
        x-component="Radio.Group"
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
      <SchemaStringField
        name="input2"
        title="禁用"
        x-decorator="FormItem"
        x-component="Radio.Group"
        :default="2"
        :enum="[
          {
            label: '选项1',
            value: 1,
            disabled: true,
          },
          {
            label: '选项2',
            value: 2,
            disabled: true,
          },
        ]"
      />
      <SchemaStringField
        name="input3"
        title="按钮"
        x-decorator="FormItem"
        x-component="Radio.Group"
        :x-component-props="{
          optionType: 'button',
          size: 'small',
        }"
        :default="2"
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
      <SchemaStringField
        name="input4"
        title="边框"
        x-decorator="FormItem"
        x-component="Radio.Group"
        :x-component-props="{
          size: 'small',
        }"
        :default="2"
        :enum="[
          {
            label: '选项1',
            value: 1,
            border: true,
          },
          {
            label: '选项2',
            value: 2,
            border: true,
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
const { FormItem, Radio, Submit } = Formily

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    Radio,
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
