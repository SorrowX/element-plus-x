import { defineComponent, h } from 'vue'
import { ElButton } from 'element-plus'
import { Rank } from '@element-plus/icons-vue'
import { useArray } from './hooks'
import { sortHandleKls } from './constant'

export const ArrayBaseSortHandle = defineComponent({
  name: 'ArrayBaseSortHandle',
  inheritAttrs: false,
  setup(props, { attrs, slots }) {
    const { field, form } = useArray()

    return () => {
      if (!field) return null

      return h(
        ElButton,
        {
          size: 'small',
          link: true,
          icon: Rank,
          disabled: form?.disabled,
          ...attrs,
          class: [form?.disabled ? '' : sortHandleKls.slice(1)].concat(
            attrs.class as any
          ),
        },
        {
          default: () => [slots?.default?.()],
        }
      )
    }
  },
})
