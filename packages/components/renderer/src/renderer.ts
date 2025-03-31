import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const rendererProps = buildProps({
  renderer: {
    type: Function,
  },
  data: {
    type: definePropType<Record<string, any>>(Object),
  },
} as const)
export type RendererProps = ExtractPropTypes<typeof rendererProps>

export const rendererEmits = {}
export type RendererEmits = typeof rendererEmits
