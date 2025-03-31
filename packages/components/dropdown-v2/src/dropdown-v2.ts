import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'
import type { DropdownOption, DropdownValue } from './types'

export const dropdownV2Props = buildProps({
  options: {
    type: definePropType<DropdownOption[]>(Array),
    default: () => [] as DropdownOption[],
  },
} as const)
export type DropdownV2Props = ExtractPropTypes<typeof dropdownV2Props>

export const dropdownV2Emits = {
  change: (value: DropdownValue, valuePath: DropdownValue[]) =>
    !!value && !!valuePath,
}
export type DropdownV2Emits = typeof dropdownV2Emits
