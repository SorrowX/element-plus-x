import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElInputNumber } from 'element-plus'
import { transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'
import type { InputNumberProps as ElInputNumberProps } from 'element-plus'

export type InputNumberProps = ElInputNumberProps

const TransformElInputNumber = transformComponent<InputNumberProps>(
  ElInputNumber,
  {
    change: 'update:modelValue',
  }
)

export const InputNumber = connect(
  TransformElInputNumber,
  mapProps(
    {
      value: 'modelValue',
      readOnly: 'readonly',
    },
    (props) => {
      let controlsPosition = 'right'
      if (props.controlsPosition) {
        controlsPosition = props.controlsPosition
      }
      return {
        controlsPosition,
      }
    }
  ),
  mapReadPretty(PreviewText.Input)
)

export default InputNumber
