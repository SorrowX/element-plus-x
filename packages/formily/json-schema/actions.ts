import { defineComponent, h } from 'vue'
import { useForm } from '@formily/vue'
import Submit from '../submit'
import Reset from '../reset'
import type { Component } from 'vue'

const isDef = (v: any) => v !== undefined && v !== null && v !== ''

export default defineComponent({
  name: 'Actions',
  props: {
    onSubmit: Function,
    onReset: Function,
    submitProps: {
      type: Object,
    },
    resetProps: {
      type: Object,
    },
    submitText: String,
    resetText: String,
    layout: {
      type: String,
      default: 'submit,reset',
    },
  },
  setup(props) {
    const formRef = useForm()
    const form = formRef.value

    const { onSubmit, onReset } = props

    const handleReset = () => onReset?.({})

    const handleSubmit = async (values: Record<string, any>) => {
      values = Object.keys(values).reduce((pre, key) => {
        const value = values[key]
        if (isDef(value)) {
          pre = {
            ...pre,
            [key]: value,
          }
        }
        return pre
      }, {})
      form.submitting = true
      await onSubmit?.(values)
      form.submitting = false
    }

    return () => {
      const { submitProps, resetProps, submitText, resetText, layout } = props

      const renderSubmit = () => {
        return submitText
          ? h(
              Submit as Component,
              { type: 'primary', onSubmit: handleSubmit, ...submitProps },
              { default: () => submitText }
            )
          : ''
      }

      const renderReset = () => {
        return resetText
          ? h(
              Reset as Component,
              { click: handleReset, ...resetProps },
              { default: () => resetText }
            )
          : ''
      }

      return h(
        'div',
        {
          class: 'fep-actions',
        },
        layout
          .split(',')
          .map((item) => {
            if (item === 'submit') {
              return renderSubmit()
            } else if (item === 'reset') {
              return renderReset()
            }
            return null
          })
          .filter((vnode) => vnode)
      )
    }
  },
})
