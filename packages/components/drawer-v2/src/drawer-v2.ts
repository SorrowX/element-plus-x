import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

import type {
  CancelProps,
  SureProps,
  TriggerProps,
} from '@element-plus/components/dialog-v2/src/dialog-v2'

export const drawerV2Props = buildProps({
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
export type DrawerV2Props = ExtractPropTypes<typeof drawerV2Props>

export const drawerV2Emits = {}
export type DrawerV2Emits = typeof drawerV2Emits
