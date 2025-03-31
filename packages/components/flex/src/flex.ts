import { buildProps, definePropType } from '@element-plus/utils'
import type { ComponentSize } from 'element-plus'

import type { CSSProperties, ExtractPropTypes } from 'vue'

export const flexProps = buildProps({
  vertical: {
    type: Boolean,
    default: false,
  },
  wrap: {
    type: definePropType<CSSProperties['flex-wrap']>(String),
  },
  justify: {
    type: definePropType<CSSProperties['justify-content']>(String),
  },
  align: {
    type: definePropType<CSSProperties['align-items']>(String),
  },
  flex: {
    type: definePropType<CSSProperties['flex']>([Number, String]),
  },
  gap: {
    type: definePropType<CSSProperties['gap'] | ComponentSize>([
      Number,
      String,
    ]),
  },
  component: {
    type: null,
  },
} as const)
export type FlexProps = ExtractPropTypes<typeof flexProps>

export const flexEmits = {}
export type FlexEmits = typeof flexEmits
