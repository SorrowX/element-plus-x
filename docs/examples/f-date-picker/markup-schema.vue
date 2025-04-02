<template>
  <Form :form="form" label-width="120" wrapper-width="360">
    <SchemaField>
      <SchemaStringField
        required
        name="date"
        title="普通日期"
        x-decorator="FormItem"
        x-component="DatePicker"
      />
      <SchemaStringField
        required
        name="week"
        title="周"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'week',
        }"
      />
      <SchemaStringField
        required
        name="month"
        title="月"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'month',
        }"
      />
      <SchemaStringField
        required
        name="year"
        title="年"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'year',
        }"
      />
      <SchemaStringField
        required
        name="dateTime"
        title="日期时间"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'datetime',
        }"
      />
      <SchemaArrayField
        required
        name="dates"
        title="多个日期"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'dates',
        }"
      />
      <SchemaArrayField
        required
        name="dateRange"
        title="日期范围"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'daterange',
          style: {
            width: '100%',
            boxSizing: 'border-box',
          },
        }"
      />
      <SchemaArrayField
        required
        name="monthRange"
        title="月范围"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'monthrange',
          style: {
            width: '100%',
            boxSizing: 'border-box',
          },
        }"
      />
      <SchemaArrayField
        required
        name="dateTimeRange"
        title="日期时间范围"
        x-decorator="FormItem"
        x-component="DatePicker"
        :x-component-props="{
          type: 'datetimerange',
          style: {
            width: '100%',
            boxSizing: 'border-box',
          },
        }"
      />
    </SchemaField>
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { DatePicker, Form, FormItem, Submit } = Formily

const form = createForm()
const fields = createSchemaField({
  components: {
    FormItem,
    DatePicker,
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
