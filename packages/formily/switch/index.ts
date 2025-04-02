import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElSwitch } from 'element-plus'
import { transformComponent } from '../__builtins__'
import { PreviewText } from '../preview-text'
import type { SwitchProps as ElSwitchProps } from 'element-plus'

export type SwitchProps = ElSwitchProps

const TransformElSwitch = transformComponent<SwitchProps>(ElSwitch, {
  change: 'update:modelValue',
})

export const Switch = connect(
  TransformElSwitch,
  mapProps({
    value: 'modelValue',
    readOnly: 'readonly',
  }),
  mapReadPretty(PreviewText.TextSwitch)
)

export default Switch
