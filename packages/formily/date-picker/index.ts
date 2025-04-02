import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElDatePicker } from 'element-plus'
import { PreviewText } from '../preview-text'
import { transformComponent } from '../__builtins__/shared'
import { getDefaultFormat } from './util'
import type { DatePickerProps } from './util'

const TransformElDatePicker = transformComponent<DatePickerProps>(
  ElDatePicker,
  {
    change: 'update:modelValue',
  }
)

export const DatePicker = connect(
  TransformElDatePicker,
  mapProps(
    {
      value: 'modelValue',
      readOnly: 'readonly',
    },
    (props) => {
      return {
        ...props,
        format: props.format || getDefaultFormat(props),
        valueFormat:
          props.valueFormat || getDefaultFormat(props, 'valueFormat'),
      }
    }
  ),
  mapReadPretty(PreviewText.DatePicker)
)

export default DatePicker
