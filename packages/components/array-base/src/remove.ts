import { defineComponent, h } from 'vue'
import { ElButton, useNamespace } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { useArray, useIndex } from './hooks'

export interface IArrayBaseRemoveProps {
  title?: string
  index?: number
}

export const ArrayBaseRemove = defineComponent<IArrayBaseRemoveProps>({
  name: 'ArrayBaseRemove',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
    },
  },
  setup(props, { attrs, slots }) {
    const ns = useNamespace('array-base')
    const indexRef = useIndex(props.index)
    const { field, form, keyMap } = useArray()
    return () => {
      if (!field) return null
      return h(
        ElButton,
        {
          class: `${ns.b('remove')}`,
          link: true,
          size: 'small',
          icon: Delete,
          disabled: form?.disabled,
          onClick: (evt: MouseEvent) => {
            if (attrs.onClick) {
              return (attrs as any).onClick?.(evt, { field, form, keyMap })
            }
            if (form?.disabled) return
            evt.stopPropagation()
            if (keyMap) {
              keyMap?.splice(indexRef.value, 1)
            }
            if (field) {
              field.fieldValue.splice(indexRef.value, 1)
            }
          },
          ...attrs,
        },
        {
          default: () => [slots?.default?.() ?? props.title],
        }
      )
    }
  },
})
