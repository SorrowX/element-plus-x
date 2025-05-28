import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import {
  buildProps,
  definePropType,
  isNumber,
  isString,
} from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

export interface PlainTabsOption {
  label: string
  value: string | number
  disabled?: boolean
}

export const plainTabsProps = buildProps({
  modelValue: {
    type: definePropType<string | number>([String, Number]),
  },
  options: {
    type: definePropType<PlainTabsOption[]>(Array),
  },
  type: {
    type: String,
    values: ['line', 'card'],
    default: 'line',
  },
} as const)
export type PlainTabsProps = ExtractPropTypes<typeof plainTabsProps>

export const plainTabsEmits = {
  [UPDATE_MODEL_EVENT]: (value: string | number) =>
    isString(value) || isNumber(value),
  [CHANGE_EVENT]: (value: string | number) =>
    isString(value) || isNumber(value),
}
export type PlainTabsEmits = typeof plainTabsEmits
