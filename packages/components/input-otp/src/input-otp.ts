import { buildProps, isNumber, isString } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { ExtractPropTypes, PropType } from 'vue'

export const inputOtpProps = buildProps({
  length: {
    type: Number,
    default: 6,
  },
  modelValue: {
    type: [Array] as PropType<any[]>,
    default: [],
  },
  validator: {
    type: Function as PropType<
      (inputValue: string, index: number, modelValueStr: string) => boolean
    >,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    values: ['small', 'default', 'large', 'auto'],
    default: 'default',
  },
  gap: {
    type: Number,
    default: 8,
  },
} as const)
export type InputOtpProps = ExtractPropTypes<typeof inputOtpProps>

export const inputOtpEmits = {
  finish: (modelValueStr: string) => isString(modelValueStr),
  input: (value: string, index: number) => isString(value) && isNumber(index),
  [UPDATE_MODEL_EVENT]: (modelValue: any[]) => Array.isArray(modelValue),
}
export type InputOtpEmits = typeof inputOtpEmits
