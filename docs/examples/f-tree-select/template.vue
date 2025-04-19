<template>
  <Form :form="form" @auto-submit="onSubmit">
    <Field
      name="address"
      title="懒加载"
      required
      :decorator="[FormItem]"
      :component="[
        TreeSelect,
        {
          style: {
            width: '240px',
          },
          lazy: true,
          load,
          checkStrictly: true,
          clearable: true,
        },
      ]"
    />

    <Submit>提交</Submit>
  </Form>
</template>

<script>
import { createForm } from '@formily/core'
import { Field } from '@formily/vue'
import { Formily } from 'element-plus-x'
const { TreeSelect, Form, FormItem, Submit } = Formily

let id = 0

const load = (node, resolve) => {
  if (node.isLeaf) return resolve([])

  setTimeout(() => {
    resolve([
      {
        value: ++id,
        label: `lazy load node${id}`,
      },
      {
        value: ++id,
        label: `lazy load node${id}`,
        isLeaf: true,
      },
    ])
  }, 400)
}

const form = createForm({
  effects: () => {},
})

export default {
  components: { Form, Field, Submit },
  data() {
    return {
      FormItem,
      TreeSelect,
      form,
      load,
    }
  },
  methods: {
    onSubmit(value) {
      console.log(value)
    },
  },
}
</script>
