import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const textHighlightProps = buildProps({
  content: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#1677FF',
  },
  ignoreCase: {
    type: Boolean,
    default: false,
  },
} as const)
export type TextHighlightProps = ExtractPropTypes<typeof textHighlightProps>

export const textHighlightEmits = {}
export type TextHighlightEmits = typeof textHighlightEmits
