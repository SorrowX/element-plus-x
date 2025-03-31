import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElInput } from 'element-plus'
import { composeExport, transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'
import type { InputProps } from 'element-plus'

const TransformElInput = transformComponent<InputProps>(ElInput, {
  change: 'update:modelValue',
})

const InnerInput = connect(
  TransformElInput,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.Input)
)

const TextArea = connect(
  InnerInput,
  mapProps((props) => {
    return {
      ...props,
      type: 'textarea',
    }
  }),
  mapReadPretty(PreviewText.Input)
)

export const Input = composeExport(InnerInput, {
  TextArea,
})
export default Input
