import { configProviderProps } from 'element-plus'
import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

import type { TablePageContext } from '@element-plus/components/table-page'

export const cfgProps = {
  tablePage: {
    type: definePropType<TablePageContext>(Object),
  },
}

export const configProviderV2Props = buildProps({
  ...configProviderProps,
  ...cfgProps, // 新增属性，用于element-plus-x
} as const)

export type ConfigProviderV2Props = ExtractPropTypes<
  typeof configProviderV2Props
>
