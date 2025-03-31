import { defineComponent, h } from 'vue'
import { ElButton, useNamespace } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { useArray, useIndex } from './hooks'

export type IArrayBaseMoveDownProps = {
  title?: string
  index?: number
}

export const ArrayBaseMoveDown = defineComponent<IArrayBaseMoveDownProps>({
  name: 'ArrayBaseMoveDown',
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
          class: `${ns.b('move-down')}`,
          size: 'small',
          link: true,
          icon: ArrowDown,
          disabled: form?.disabled,
          onClick: (evt: MouseEvent) => {
            if (attrs.onClick) {
              return (attrs as any).onClick?.(evt, { field, form, keyMap })
            }
            if (form?.disabled) return

            evt.stopPropagation()
            const curIndex = indexRef.value
            if (Array.isArray(keyMap)) {
              let nextIndex = indexRef.value + 1
              const length = keyMap.length
              nextIndex = nextIndex >= length ? 0 : nextIndex
              keyMap.splice(nextIndex, 0, keyMap.splice(curIndex, 1)[0])
            }
            if (Array.isArray(field.fieldValue)) {
              let nextIndex = indexRef.value + 1
              const length = field.fieldValue.length
              nextIndex = nextIndex >= length ? 0 : nextIndex
              field.fieldValue.splice(
                nextIndex,
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
