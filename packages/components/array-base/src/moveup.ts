import { defineComponent, h } from 'vue'
import { ElButton, useNamespace } from 'element-plus'
import { ArrowUp } from '@element-plus/icons-vue'
import { useArray, useIndex } from './hooks'

export type IArrayBaseMoveUpProps = {
  title?: string
  index?: number
}

export const ArrayBaseMoveUp = defineComponent<IArrayBaseMoveUpProps>({
  name: 'ArrayBaseMoveUp',
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
          class: `${ns.b('move-up')}`,
          size: 'small',
          link: true,
          icon: ArrowUp,
          disabled: form?.disabled,
          onClick: (evt: MouseEvent) => {
            if (attrs.onClick) {
              return (attrs as any).onClick?.(evt, { field, form, keyMap })
            }
            if (form?.disabled) return
            evt.stopPropagation()
            const curIndex = indexRef.value

            if (Array.isArray(keyMap)) {
              const length = keyMap.length - 1
              let preIndex = indexRef.value - 1
              preIndex = preIndex < 0 ? length : preIndex
              keyMap.splice(preIndex, 0, keyMap.splice(curIndex, 1)[0])
            }
            if (Array.isArray(field.fieldValue)) {
              const length = field.fieldValue.length - 1
              let preIndex = indexRef.value - 1
              preIndex = preIndex < 0 ? length : preIndex
              field.fieldValue.splice(
                preIndex,
                0,
                field.fieldValue.splice(curIndex, 1)[0]
              )
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
