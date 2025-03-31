import { defineComponent, h } from 'vue'
import { useNamespace } from 'element-plus'
import { useIndex } from './hooks'

export type IArrayBaseIndexProps = {
  index?: number
  formatter?: (index: number) => string
}

export const ArrayBaseIndex = defineComponent<IArrayBaseIndexProps>({
  name: 'ArrayBaseIndex',
  props: {
    index: {
      type: Number,
    },
    formatter: {
      type: Function,
    },
  },
  setup(props, { attrs, slots }) {
    const ns = useNamespace('array-base')
    const index = useIndex(props.index)

    const formatter = props.formatter ?? ((index: number) => `#${index + 1}.`)

    return () => {
      return h(
        'span',
        {
          class: ns.b('index'),
          ...attrs,
        },
        {
          default: () => slots?.default?.() ?? formatter(index.value),
        }
      )
    }
  },
})
