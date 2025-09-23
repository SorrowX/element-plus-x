import { buildProps, isNumber, isString } from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { ExtractPropTypes, PropType } from 'vue'

export const inputOtpProps = buildProps({
  modelValue: {
    type: [Array] as PropType<string[] | number[]>,
    default: [],
  },
  validator: {
    type: Function as PropType<
      (inputValue: string, index: number, modelValueStr: string) => boolean
    >,
  },
  length: {
    type: Number,
    default: 6,
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
