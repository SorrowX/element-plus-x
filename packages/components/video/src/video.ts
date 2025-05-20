import { buildProps, definePropType, isBoolean } from '@element-plus/utils'
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
  onCoverLoad: {
    type: definePropType<(event: any) => void>(Function),
  },
  readonly: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
} as const)
export type VideoProps = ExtractPropTypes<typeof videoProps>

export const videoEmits = {
  click: (paused: boolean, event: MouseEvent) => {
    return isBoolean(paused) && event instanceof MouseEvent
  },
}
export type VideoEmits = typeof videoEmits
