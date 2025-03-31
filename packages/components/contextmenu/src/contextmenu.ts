import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'
import type {
  DropdownOption,
  DropdownValue,
} from '@element-plus/components/dropdown-v2/src/types'

export const contextmenuProps = buildProps({
  data: {
    type: null,
  },
  options: {
    type: definePropType<DropdownOption[]>(Array),
    default: () => [] as DropdownOption[],
  },
} as const)
export type ContextmenuProps = ExtractPropTypes<typeof contextmenuProps>

export const contextmenuEmits = {
  change: (value: DropdownValue, valuePath: DropdownValue[]) =>
    !!value && !!valuePath,
}
export type ContextmenuEmits = typeof contextmenuEmits
