import { withInstall } from '@element-plus/utils'
import ArrayTable from './src/index'
import ArrayTableColumn from './src/column'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElArrayTable: SFCWithInstall<typeof ArrayTable> =
  withInstall(ArrayTable)
export const ElArrayTableColumn: SFCWithInstall<typeof ArrayTableColumn> =
  withInstall(ArrayTableColumn)

export default ElArrayTable

export * from './src/index'
