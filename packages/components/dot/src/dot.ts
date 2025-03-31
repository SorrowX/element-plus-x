import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const dotProps = buildProps({
  type: {
    type: String,
    values: ['primary', 'success', 'info', 'warning', 'danger'],
    default: 'primary',
  },
  color: String,
  size: {
    type: String,
  },
} as const)
export type DotProps = ExtractPropTypes<typeof dotProps>

export const dotEmits = {}
export type DotEmits = typeof dotEmits
