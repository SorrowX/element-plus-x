import { computed, defineComponent, h, ref } from 'vue'
import { ElSpace } from 'element-plus'
import { createForm } from '@formily/core'
import { createSchemaField, useForm } from '@formily/vue'

import Form from '../form'
import FormLayout from '../form-layout'
import FormItem from '../form-item'
import FormGrid from '../form-grid'
import Submit from '../submit'
import Reset from '../reset'
import Input from '../input'
import InputNumber from '../input-number'
import Select from '../select'
import DatePicker from '../date-picker'
import TimePicker from '../time-picker'
import Radio from '../radio'
import Checkbox from '../checkbox'
import Switch from '../switch'
import Cascader from '../cascader'
import TreeSelect from '../tree-select'
import SelectV2 from '../select-v2'
import Slider from '../slider'
import Mention from '../mention'
import Actions from './actions'

import type { Component } from 'vue'

export type SubmitFunction<T> = (
  onSubmit?: (values: any) => Promise<T> | void
) => Promise<T>

export type FormSubmit<T> = (
  onSubmit?: (values: any) => Promise<T> | void,
  scrollToError?: boolean
) => Promise<T>

const defaultComponents = {
  Form,
  FormItem,
  FormGrid,
  FormLayout,
  Submit,
  Reset,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Radio,
  Checkbox,
  Switch,
  Cascader,
  Actions,
  TreeSelect,
  SelectV2,
  Slider,
  Mention,
  Space: ElSpace,
}

const staticKlass = 'json-schema__form'

export const JsonSchema = defineComponent({
  name: 'JsonSchema',
  inheritAttrs: false,
  props: {
    iFormProps: {
      type: Object,
      default: () => ({}),
    },
    components: {
      type: Object,
    },
    scope: {
      type: Object,
    },
    schema: {
      type: Object,
    },
    forceCreateForm: {
      type: Boolean,
      default: false,
    },
    // 该属性弃用，请使用 components 和 scope属性，保留为了兼容之前的使用姿势
    iSchemaFieldVueFactoryOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { attrs, expose }) {
    const formRef = useForm()
    const containerRef = ref()

    const hasTopForm = computed(() => !props.forceCreateForm && !!formRef.value)

    const fields = computed(() => {
      const { components, scope, iSchemaFieldVueFactoryOptions } = props
      return createSchemaField({
        components: {
          ...defaultComponents,
          ...components,
          ...iSchemaFieldVueFactoryOptions?.components,
        },
        scope: scope ? scope : iSchemaFieldVueFactoryOptions?.scope ?? {},
      })
    })

    const handleScrollToError = () => {
      const container = containerRef.value
      if (container) {
        const elements = container.querySelectorAll('.fep-form-item-error-help')
        if (elements && elements.length) {
          const formItemEle = elements[0]?.parentElement?.parentElement // fep-form-item-control -> fep-form-item
          formItemEle?.scrollIntoView?.({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          })
        }
      }
    }

    const submit = (originSubmit: SubmitFunction<any>) => {
      return <T>(
        onSubmit?: (values: any) => Promise<T> | void,
        scrollToError?: boolean
      ): Promise<T> => {
        return originSubmit(onSubmit)?.catch((e: any) => {
          if (scrollToError) handleScrollToError()
          throw e
        })
      }
    }

    const form = computed(() => {
      return hasTopForm.value ? formRef.value : createForm(props.iFormProps)
    })

    // 重写 form实例 的submit方法，用于是否滚动到错误元素
    if (form.value) {
      const originSubmit = form.value.submit
      form.value.submit = submit(originSubmit)
    }

    expose({ formInstance: form.value })

    return () => {
      const { schema } = props
      const { SchemaField } = fields.value

      return h(
        'div',
        {
          class: staticKlass,
          ref: containerRef,
        },
        [
          h(
            Form as Component,
            {
              colon: false,
              component: 'div',
              ...attrs,
              form: form.value,
            },
            {
              default: () => h(SchemaField, { schema }),
            }
          ),
        ]
      )
    }
  },
})

export default JsonSchema
