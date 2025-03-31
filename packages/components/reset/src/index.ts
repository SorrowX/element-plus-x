import { defineComponent, h } from 'vue'
import { ElButton } from 'element-plus'
import { useForm } from '@element-plus/hooks'
import { isFunction } from '@element-plus/utils'
import { resetProps } from './reset'
import type { FormContextType } from '@element-plus/hooks'

export default defineComponent({
  name: 'ElReset',
  inheritAttrs: false,
  props: resetProps,
  setup(props, { attrs, slots }) {
    const form: FormContextType = useForm()
    const resetFields = form?.resetFields

    return () => {
      return h(
        ElButton,
        {
          nativeType: 'button',
          ...attrs,
          onClick: (e: any) => {
            if (isFunction(attrs.onClick)) {
              if (attrs.onClick(e) === false) return
            }
            resetFields?.()
          },
        },
        slots
      )
    }
  },
})
