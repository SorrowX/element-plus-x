<template>
  <FormProvider :form="form">
    <FormLayout
      :breakpoints="[680]"
      :layout="['vertical', 'horizontal']"
      :labelAlign="['left', 'right']"
      :labelCol="[24, 6]"
      :wrapperCol="[24, 10]"
    >
      <Field
        name="input"
        title="输入框"
        :decorator="[
          FormItem,
          {
            tooltip: '123',
          },
        ]"
        :component="[Input]"
        :required="true"
      />
      <Field
        name="select"
        title="选择框"
        :decorator="[FormItem]"
        :component="[Select]"
        :required="true"
      />
    </FormLayout>
  </FormProvider>
</template>

<script>
import { createForm } from '@formily/core'
import { FormProvider, Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { FormLayout, FormItem, Input, Select } = Formily

export default {
  components: { FormProvider, Field, FormLayout },
  data() {
    const form = createForm()
    return {
      FormLayout,
      FormItem,
      Input,
      Select,
      form,
    }
  },
}
</script>
