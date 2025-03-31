import { defineComponent, h } from 'vue'
import { useNamespace } from 'element-plus'

export default defineComponent({
  name: 'ElBubbleLoading',
  inheritAttrs: false,
  setup(props, { attrs }) {
    const ns = useNamespace('bubble-dot')
    const itemKlass = ns.b('item')

    return () => {
      return h(
        'span',
        { ...attrs, class: ns.b() },
        Array.from({ length: 3 }).map((_, index) => {
          return h('i', {
            key: `item-${index + 1}`,
            class: itemKlass,
          })
        })
      )
    }
  },
})
