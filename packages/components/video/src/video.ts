import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const videoProps = buildProps({
  src: {
    type: definePropType<string>(String),
  },
  poster: {
    type: definePropType<string>(String),
  },
  duration: {
    type: definePropType<string | number>([String, Number]),
  },
  onPosterLoad: {
    type: definePropType<(event: Event) => void>(Function),
  },
  onClick: {
    type: definePropType<(event: PointerEvent) => void>(Function),
  },
  readonly: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
} as const)
export type VideoProps = ExtractPropTypes<typeof videoProps>

export const videoEmits = {}
export type VideoEmits = typeof videoEmits
