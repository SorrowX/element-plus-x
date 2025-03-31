import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const resetProps = buildProps({} as const)
export type ResetProps = ExtractPropTypes<typeof resetProps>

export const resetEmits = {}
export type ResetEmits = typeof resetEmits
