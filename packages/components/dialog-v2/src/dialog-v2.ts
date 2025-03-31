import { buildProps, definePropType } from '@element-plus/utils'
import type { ButtonProps } from 'element-plus'

import type { ExtractPropTypes } from 'vue'

export type TriggerProps = Partial<ButtonProps> & {
  triggerText?: string
}

export type CancelProps = Partial<ButtonProps> & {
  hidden?: boolean
  cancelText?: string
}

export type SureProps = Partial<ButtonProps> & {
  hidden?: boolean
  sureText?: string
}

export const dialogV2Props = buildProps({
  title: {
    type: String,
  },
  triggerProps: {
    type: definePropType<TriggerProps>(Object),
  },
  cancelProps: {
    type: definePropType<CancelProps>(Object),
  },
  sureProps: {
    type: definePropType<SureProps>(Object),
  },
  onCancel: {
    type: definePropType<({ close }: { close: () => void }) => void>(Function),
  },
  onSure: {
    type: definePropType<
      ({ close }: { close: () => void }) => void | Promise<any>
    >(Function),
  },
} as const)
export type DialogV2Props = ExtractPropTypes<typeof dialogV2Props>

export const dialogV2Emits = {}
export type DialogV2Emits = typeof dialogV2Emits
