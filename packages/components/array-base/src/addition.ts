import { defineComponent, h } from 'vue'
import { ElButton, useNamespace } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useArray } from './hooks'

export interface IArrayBaseAdditionProps {
  title?: string
  method?: 'push' | 'unshift'
  defaultValue?: any
}

export const ArrayBaseAddition = defineComponent<IArrayBaseAdditionProps>({
  name: 'ArrayBaseAddition',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    method: {
      type: String,
      default: 'push',
    },
    defaultValue: {
      type: null,
      default: '',
    },
  },
  setup(props: IArrayBaseAdditionProps, { attrs, slots }) {
    const ns = useNamespace('array-base')
    const { field, form, keyMap }: any = useArray()
    return () => {
      if (!field) return null
      return h(
        ElButton,
        {
          class: `${ns.b('addition')}`,
          icon: Plus,
          disabled: form?.disabled,
          ...attrs,
          onClick: (evt: MouseEvent) => {
            if (attrs.onClick) {
              return (attrs as any).onClick?.(evt, { field, form, keyMap })
            }
            if (form?.disabled) return
            evt.stopPropagation()
            const defaultValue =
              typeof props.defaultValue === 'function'
                ? props.defaultValue()
                : props.defaultValue
            if (props.method === 'unshift') {
              field?.fieldValue.unshift(defaultValue)
            } else {
              field?.fieldValue.push(defaultValue)
            }
          },
        },
        {
          default: () => [slots?.default?.() ?? props.title],
        }
      )
    }
  },
})
