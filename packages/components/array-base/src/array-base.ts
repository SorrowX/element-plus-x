import { defineComponent, provide, renderSlot } from 'vue'
import { keyMapType, useField, useForm } from './hooks'
import { ArrayBaseSymbol } from './constant'
import type { PropType } from 'vue'
import type { FormContext, FormItemContext } from 'element-plus'

export interface IArrayBaseProps {
  disabled?: boolean
  keyMap?: keyMapType
}

export type IFieldContext = FormItemContext | undefined
export type IFormContext = FormContext | undefined

export interface IArrayBaseContext {
  field: IFieldContext
  form: IFormContext
  keyMap?: keyMapType
}

export const ArrayBase = defineComponent<IArrayBaseProps>({
  name: 'ArrayBase',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    keyMap: {
      type: [Array] as PropType<keyMapType>,
    },
  },
  setup(props, { slots }) {
    const field = useField()
    const form = useForm()

    provide(ArrayBaseSymbol, {
      field,
      form,
      keyMap: props.keyMap,
    })

    return () => renderSlot(slots, 'default')
  },
})
