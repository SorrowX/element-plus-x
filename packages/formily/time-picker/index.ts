import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElTimePicker } from 'element-plus'
import { PreviewText } from '../preview-text'
import { transformComponent } from '../__builtins__/shared'
import type { TimePickerDefaultProps } from 'element-plus'

export type TimePickerProps = TimePickerDefaultProps

const TransformElTimePicker = transformComponent<TimePickerProps>(
  ElTimePicker,
  {
    change: 'update:modelValue',
  }
)

export const TimePicker = connect(
  TransformElTimePicker,
  mapProps({ readOnly: 'readonly', value: 'modelValue' }),
  mapReadPretty(PreviewText.TimePicker)
)

export default TimePicker
