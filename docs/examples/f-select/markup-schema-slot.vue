<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="select"
        title="选择框"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          style: {
            width: '240px',
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
        :x-content="content"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script setup>
import { h } from 'vue'
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
const { SchemaField, SchemaStringField } = fields

const log = (value) => {
  console.log(value)
}

const content = {
  // option为 el-option 组件的默认插槽
  option: {
    props: ['option'],
    render(thisProxy, proxyToUse) {
      const { option } = thisProxy
      return h('div', {}, `${option.label}-${option.value}`)
    },
  },
  header: {
    render() {
      return h('div', {}, `header`)
    },
  },
}
</script>
