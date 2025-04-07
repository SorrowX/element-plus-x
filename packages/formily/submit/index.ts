import { defineComponent, h } from 'vue'
import { IFormFeedback } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { useParentForm } from '@formily/vue'
import { ElButton } from 'element-plus'
import type { ButtonProps as ElButtonProps } from 'element-plus'
import type { FormSubmit } from '../json-schema'

export interface ISubmitProps extends ElButtonProps {
  onClick?: (e: MouseEvent) => any
  onSubmit?: (values: any) => any
  onSubmitSuccess?: (payload: any) => void
  onSubmitFailed?: (feedbacks: IFormFeedback[]) => void
}

export const Submit = observer(
  defineComponent<ISubmitProps>({
    name: 'FSubmit',
    inheritAttrs: false,
    props: ['onClick', 'onSubmit', 'onSubmitSuccess', 'onSubmitFailed'],
    setup(props, { attrs, slots }) {
      const formRef = useParentForm()

      return () => {
        const { onClick, onSubmit, onSubmitSuccess, onSubmitFailed } = props

        const form = formRef?.value
        return h(
          ElButton,
          {
            nativeType: attrs?.submit ? 'button' : 'submit',
            type: 'primary',
            ...attrs,
            loading: (attrs.loading !== undefined
              ? attrs.loading
              : form?.submitting) as boolean,
            onClick: (e: any) => {
              if (onClick) {
                if (onClick(e) === false) return
              }
              if (onSubmit) {
                ;(form?.submit as FormSubmit<any>)(
                  onSubmit,
                  attrs.scrollIntoView as boolean
                )
                  .then(onSubmitSuccess as (e: any) => void)
                  .catch(onSubmitFailed as (e: any) => void)
              }
            },
          },
          slots
        )
      }
    },
  })
)

export default Submit
