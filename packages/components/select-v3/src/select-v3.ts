import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export enum OptionTypeEnum {
  Wechat = 1,
  BusinessWechat = 2,
}

export type OptionType = Record<string, any> & {
  type: OptionTypeEnum
}

export const selectV3Props = buildProps({
  options: {
    type: definePropType<OptionType[]>(Array),
    required: true,
  },
  textEllipsisOptions: {
    type: Object,
    default: () => ({}),
  },
  icon: {
    type: definePropType<any>(Object),
  },
  iconOptions: {
    type: Object,
    default: () => ({}),
  },
} as const)
export type SelectV3Props = ExtractPropTypes<typeof selectV3Props>

export const selectV3Emits = {}
export type SelectV3Emits = typeof selectV3Emits
