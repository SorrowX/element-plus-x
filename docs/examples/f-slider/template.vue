<template>
  <Form :form="form" @auto-submit="onSubmit">
    <Field
      name="slider"
      title="显示标记"
      :decorator="[FormItem]"
      :component="[
        Slider,
        {
          style: {
            width: '360px',
            marginLeft: '16px',
          },
          marks,
        },
      ]"
    />
    <Submit>提交</Submit>
    <Reset>重置</Reset>
  </Form>
</template>

<script setup>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { Slider, Form, FormItem, Submit, Reset } = Formily

const form = createForm({
  effects: () => {},
})

const onSubmit = (value) => {
  console.log(value)
}

const marks = {
  0: '0°C',
  8: '8°C',
  37: '37°C',
  50: {
    style: {
      color: '#1989FA',
    },
    label: '50%',
  },
}
</script>
