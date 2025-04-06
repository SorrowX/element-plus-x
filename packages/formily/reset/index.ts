import { defineComponent, h } from 'vue'
import { IFieldResetOptions } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { useParentForm } from '@formily/vue'
import { ElButton } from 'element-plus'
import type { ButtonProps as ElButtonProps } from 'element-plus'

export type ResetProps = IFieldResetOptions & ElButtonProps

export const Reset = observer(
  defineComponent<ResetProps>({
    name: 'FReset',
    inheritAttrs: false,
    props: {
      forceClear: {
        type: Boolean,
        default: false,
      },
      validate: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { attrs, slots }) {
      const formRef = useParentForm()
      return () => {
        const form = formRef?.value
        return h(
          ElButton,
          {
            ...attrs,
            onClick: (e: any) => {
              if (attrs?.onClick) {
                if ((attrs as any).onClick(e) === false) return
              }
              form
                ?.reset('*', {
                  forceClear: props.forceClear,
                  validate: props.validate,
                })
                .then(attrs.onResetValidateSuccess as (e: any) => void)
                .catch(attrs.onResetValidateFailed as (e: any) => void)
            },
          },
          slots
        )
      }
    },
  })
)

export default Reset
