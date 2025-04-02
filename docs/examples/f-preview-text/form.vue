<template>
  <FormLayout :label-col="6" :wrapper-col="10">
    <FormProvider :form="form">
      <SchemaField>
        <SchemaStringField
          x-decorator="FormItem"
          title="文本预览"
          x-component="Input"
          default="Hello world"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="选择项预览"
          x-component="Select"
          :x-component-props="{
            multiple: true,
          }"
          :default="['123', '222']"
          :enum="[
            { label: 'A111', value: '123' },
            {
              label: 'A222',
              value: '222',
            },
          ]"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="日期预览"
          x-component="DatePicker"
          default="2020-11-23 22:15:20"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="时间预览"
          x-component="TimePicker"
          :default="'2020-11-23 22:15:20'"
        />
        <SchemaStringField
          x-decorator="FormItem"
          title="Cascader预览"
          x-component="Cascader"
          :default="['hangzhou']"
          :enum="[
            { label: '杭州', value: 'hangzhou' },
            { label: '余杭', value: 'yuhang' },
          ]"
        />
      </SchemaField>
      <FormButtonGroup align-form-item>
        <Button
          @click="
            () => {
              form.setState((state) => {
                state.editable = !state.editable
              })
            }
          "
          >切换阅读态</Button
        >
      </FormButtonGroup>
    </FormProvider>
  </FormLayout>
</template>

<script>
import { createForm } from '@formily/core'
import { ElButton } from 'element-plus'
import { FormProvider, createSchemaField } from '@formily/vue'
import { Formily } from 'element-plus-x'
const {
  FormItem,
  FormLayout,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Cascader,
  FormButtonGroup,
} = Formily

const fields = createSchemaField({
  components: {
    FormItem,
    Input,
    Select,
    DatePicker,
    TimePicker,
    Cascader,
    FormButtonGroup,
  },
})

export default {
  components: {
    Button: ElButton,
    FormProvider,
    FormLayout,
    FormButtonGroup,
    ...fields,
  },
  data() {
    const form = createForm()
    return {
      form,
    }
  },
  methods: {
    log(v) {
      console.log(v)
    },
  },
}
</script>
