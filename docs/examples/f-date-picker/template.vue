<template>
  <Form :form="form" label-width="120">
    <Field
      name="date"
      title="普通日期"
      :decorator="[FormItem]"
      :component="[DatePicker]"
    />
    <Field
      name="week"
      title="周"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'week',
        },
      ]"
    />
    <Field
      name="month"
      title="月"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'month',
        },
      ]"
    />
    <Field
      name="year"
      title="年"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'year',
        },
      ]"
    />
    <Field
      name="dateTime"
      title="日期时间"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'datetime',
        },
      ]"
    />
    <ArrayField
      name="dates"
      title="多个日期"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'dates',
        },
      ]"
    />
    <ArrayField
      name="dateRange"
      title="日期范围"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'daterange',
          style: {
            boxSizing: 'border-box',
          },
        },
      ]"
    />
    <ArrayField
      name="monthRange"
      title="月范围"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'monthrange',
          style: {
            width: '100%',
            boxSizing: 'border-box',
          },
        },
      ]"
    />
    <ArrayField
      name="dateTimeRange"
      title="日期时间范围"
      :decorator="[FormItem]"
      :component="[
        DatePicker,
        {
          type: 'datetimerange',
          style: {
            boxSizing: 'border-box',
          },
        },
      ]"
    />
    <Submit @submit="onSubmit">提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { ArrayField, Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { DatePicker, Form, FormItem, Submit } = Formily

const form = createForm()

export default {
  components: { Form, Field, ArrayField, Submit },
  data() {
    return {
      FormItem,
      DatePicker,
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
