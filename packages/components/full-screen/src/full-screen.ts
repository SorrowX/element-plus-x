import { buildProps, definePropType } from '@element-plus/utils'
import { DIV_TAG } from '@element-plus/constants'
import type { ExtractPropTypes } from 'vue'

export type FullScreenType = 'window' | 'browser'

export const fullScreenProps = buildProps({
  tag: {
    type: definePropType<string>(String),
    default: DIV_TAG,
  },
  type: {
    type: definePropType<string>(String),
    default: 'window',
    values: ['window', 'browser'],
  },
} as const)
export type FullScreenProps = ExtractPropTypes<typeof fullScreenProps>

export const fullScreenEmits = {}
export type FullScreenEmits = typeof fullScreenEmits
