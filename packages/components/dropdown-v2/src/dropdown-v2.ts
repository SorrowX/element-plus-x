import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'
import type { DropdownOption, DropdownValue } from './types'

import type { TriggerProps } from '@element-plus/components/dialog-v2/src/dialog-v2'

export const dropdownV2Props = buildProps({
  options: {
    type: definePropType<DropdownOption[]>(Array),
    default: () => [] as DropdownOption[],
  },
  splitButton: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  triggerProps: {
    type: definePropType<TriggerProps>(Object),
  },
} as const)
export type DropdownV2Props = ExtractPropTypes<typeof dropdownV2Props>

export const dropdownV2Emits = {
  change: (value: DropdownValue, valuePath: DropdownValue[]) =>
    !!value && !!valuePath,
}
export type DropdownV2Emits = typeof dropdownV2Emits
