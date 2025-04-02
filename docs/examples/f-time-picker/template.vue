<template>
  <FormProvider :form="form">
    <Field
      name="time"
      title="时间"
      required
      :decorator="[FormItem]"
      :component="[
        TimePicker,
        {
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Field
      name="[startTime,endTime]"
      title="时间范围"
      :decorator="[FormItem]"
      :component="[
        TimePicker,
        {
          isRange: true,
          style: {
            width: '240px',
          },
        },
      ]"
    />
    <Submit @submit="log">提交</Submit>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { Field, FormProvider } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { FormItem, Submit, TimePicker } = Formily

const form = createForm()

export default {
  components: { FormProvider, Field, Submit },
  data() {
    return {
      FormItem,
      TimePicker,
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
