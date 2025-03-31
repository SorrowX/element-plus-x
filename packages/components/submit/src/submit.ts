import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const submitProps = buildProps({
  onClick: {
    type: definePropType<(event: MouseEvent) => void | boolean>(Function),
  },
  onSubmit: {
    type: definePropType<(values: object) => void | Promise<any>>(Function),
  },
  onSubmitSuccess: {
    type: definePropType<(payload: any) => void>(Function),
  },
  onSubmitFailed: {
    type: definePropType<(feedbacks: unknown) => void>(Function),
  },
} as const)
export type SubmitProps = ExtractPropTypes<typeof submitProps>

export const submitEmits = {}
export type SubmitEmits = typeof submitEmits
