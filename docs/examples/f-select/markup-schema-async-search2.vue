<template>
  <FormProvider :form="form">
    <SchemaField>
      <SchemaStringField
        name="select"
        title="异步搜索选择框"
        x-decorator="FormItem"
        x-component="Select"
        :x-component-props="{
          filterable: true,
          remote: true,
          remoteMethod: remoteMethod,
          style: {
            width: '240px',
          },
        }"
      />
    </SchemaField>
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script setup lang="ts">
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
import type { Field } from '@formily/core'
const { FormItem, Select, Submit } = Formily

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const list = states.map((item) => {
  return { value: `value:${item}`, label: `label:${item}` }
})

let tick: any
const remoteMethod = (query: string) => {
  const field = form.query('*').take() as Field
  if (query) {
    clearTimeout(tick)
    field.loading = true
    tick = setTimeout(() => {
      if (field) {
        field.setDataSource(
          list.filter((item) => {
            return item.label.toLowerCase().includes(query.toLowerCase())
          })
        )
        field.loading = false
      }
    }, 200)
  } else {
    if (field) {
      field.setDataSource([])
    }
  }
}

const form = createForm({})
const fields = createSchemaField({
  components: {
    FormItem,
    Select,
  },
})
const { SchemaField, SchemaStringField } = fields

const log = (value: Record<string, any>) => {
  console.log(value)
}
</script>
