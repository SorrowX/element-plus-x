import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const affixBottomProps = buildProps({
  position: {
    type: String,
    default: 'absolute',
    values: ['absolute', 'fixed'],
  },
  tag: {
    type: String,
    default: 'div',
  },
} as const)
export type AffixBottomProps = ExtractPropTypes<typeof affixBottomProps>

export const affixBottomEmits = {}
export type AffixBottomEmits = typeof affixBottomEmits
