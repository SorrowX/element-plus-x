import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const ellipsisProps = buildProps({
  rows: {
    type: [Number, String],
  },
  condition: {
    type: definePropType<
      (contentWidth: number, containerWidth: number) => boolean
    >([Function]),
  },
} as const)
export type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>

export const ellipsisEmits = {}
export type EllipsisEmits = typeof ellipsisEmits
