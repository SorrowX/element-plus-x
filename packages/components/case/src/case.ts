import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const caseProps = buildProps({
  str: {
    type: String,
    default: '',
  },
} as const)
export type CaseProps = ExtractPropTypes<typeof caseProps>

export const caseEmits = {}
export type CaseEmits = typeof caseEmits
