import { buildProps, definePropType } from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import type { ExtractPropTypes } from 'vue'

export const splitProps = buildProps({
  modelValue: {
    type: definePropType<number>(Number),
    default: 0.5,
  },
  vertical: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  min: {
    type: definePropType<number>(Number),
    default: 0.1,
  },
  max: {
    type: definePropType<number>(Number),
    default: 0.9,
  },
} as const)
export type SplitProps = ExtractPropTypes<typeof splitProps>

export const splitEmits = {
  [UPDATE_MODEL_EVENT]: (value: number) => value,
  [CHANGE_EVENT]: (value: number) => value,
}
export type SplitEmits = typeof splitEmits
