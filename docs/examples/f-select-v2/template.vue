<template>
  <Form :form="form" @auto-submit="onSubmit">
    <Field
      name="select"
      title="自定义头部"
      required
      :decorator="[FormItem]"
      :component="[
        SelectV2,
        {
          style: {
            width: '240px',
          },
          clearable: true,
          options: options,
        },
      ]"
    >
      <template #header>
        <el-checkbox> All </el-checkbox>
      </template>
    </Field>

    <Submit>提交</Submit>
  </Form>
</template>

<script setup>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { SelectV2, Form, FormItem, Submit } = Formily

const form = createForm({
  effects: () => {},
})

const onSubmit = (value) => {
  console.log(value)
}

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const options = Array.from({ length: 1000 }).map((_, idx) => ({
  value: `Option ${idx + 1}`,
  label: `${initials[idx % 10]}${idx}`,
}))
</script>
