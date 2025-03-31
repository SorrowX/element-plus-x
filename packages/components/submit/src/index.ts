import { defineComponent, h, ref } from 'vue'
import { ElButton } from 'element-plus'
import { useForm } from '@element-plus/hooks'
import { isFunction } from '@element-plus/utils'
import { submitProps } from './submit'
import type { FormContextType } from '@element-plus/hooks'
import type { ValidateFieldsError } from 'async-validator'

export default defineComponent({
  name: 'ElSubmit',
  inheritAttrs: false,
  props: submitProps,
  setup(props, { attrs, slots }) {
    const form: FormContextType = useForm()
    const validateField = form?.validateField
    const loading = ref<boolean>(false)

    return () => {
      const { onClick, onSubmit, onSubmitSuccess, onSubmitFailed } = props

      return h(
        ElButton,
        {
          nativeType: 'button',
          type: 'primary',
          loading: loading.value,
          ...attrs,
          onClick: (e: any) => {
            if (isFunction(onClick)) {
              if (onClick(e) === false) return
            }
            if (loading.value) return
            if (onSubmit && validateField) {
              validateField(
                undefined,
                async (valid: boolean, fields?: ValidateFieldsError) => {
                  try {
                    if (valid) {
                      loading.value = true
                      await onSubmit(form.model ?? {})?.then(onSubmitSuccess)
                    } else {
                      throw fields
                    }
                  } catch (e) {
                    onSubmitFailed?.(e as unknown)
                  } finally {
                    loading.value = false
                  }
                }
              )
            }
          },
        },
        slots
      )
    }
  },
})
