<template>
  <Form :form="form">
    <SchemaField>
      <SchemaStringField
        name="size"
        title="Radio.Group"
        x-decorator="FormItem"
        x-component="Radio.Group"
        :enum="[
          { value: 'small', label: 'Small' },
          { value: 'default', label: 'Default' },
          { value: 'large', label: 'Large' },
        ]"
      />
      <SchemaVoidField name="sizeWrap" x-component="Div">
        <SchemaStringField
          name="input"
          title="Input"
          x-decorator="FormItem"
          x-component="Input"
          required
        />
        <SchemaStringField
          name="select1"
          title="Multiple Select"
          x-decorator="FormItem"
          x-component="Select"
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
          :x-component-props="{
            multiple: true,
            placeholder: '请选择',
          }"
          required
        />
        <SchemaStringField
          name="select2"
          title="Select"
          x-decorator="FormItem"
          x-component="Select"
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
          :x-component-props="{
            placeholder: '请选择',
          }"
          required
        />
        <SchemaStringField
          name="Cascader"
          title="Cascader"
          x-decorator="FormItem"
          x-component="Cascader"
          required
        />
        <SchemaStringField
          name="DatePicker"
          title="DatePicker"
          x-decorator="FormItem"
          x-component="DatePicker"
          required
        />
        <SchemaStringField
          name="InputNumber"
          title="InputNumber"
          x-decorator="FormItem"
          x-component="InputNumber"
          required
        />
        <SchemaBooleanField
          name="Switch"
          title="Switch"
          x-decorator="FormItem"
          x-component="Switch"
          required
        />
      </SchemaVoidField>
    </SchemaField>
  </Form>
</template>

<script>
import { h } from 'vue'
import { createForm, onFieldChange } from '@formily/core'
import { createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const {
  Form,
  FormItem,
  Input,
  Select,
  Cascader,
  DatePicker,
  Switch,
  InputNumber,
  Radio,
} = Formily

const Div = {
  setup(props, { attrs, slots }) {
    return () => h('div', { ...props, ...attrs }, slots)
  },
}

const form = createForm({
  values: {
    size: 'default',
  },
  effects: () => {
    onFieldChange('size', ['value'], (field, form) => {
      form.setFieldState('sizeWrap.*', (state) => {
        if (state.decorator[1]) {
          state.decorator[1].size = field.value
        }
      })
    })
  },
})
const fields = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    Cascader,
    DatePicker,
    Switch,
    InputNumber,
    Radio,
    Div,
  },
})

export default {
  components: { Form, ...fields },
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
