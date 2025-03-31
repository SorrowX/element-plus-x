import { withInstall } from '@element-plus/utils'
import TablePage from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElTablePage: SFCWithInstall<typeof TablePage> =
  withInstall(TablePage)
export default ElTablePage

export * from './src/table-page'
export type { TablePageInstance } from './src/instance'
