import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

import type { TablePageContext } from '@element-plus/components/table-page'

export const configProviderV2Props = buildProps({
  tablePage: {
    type: definePropType<TablePageContext>(Object),
  },
} as const)

export type ConfigProviderV2Props = ExtractPropTypes<
  typeof configProviderV2Props
>
