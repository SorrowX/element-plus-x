import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const lineTreeProps = buildProps({} as const)
export type LineTreeProps = ExtractPropTypes<typeof lineTreeProps>

export const lineTreeEmits = {}
export type LineTreeEmits = typeof lineTreeEmits
