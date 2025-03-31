import { withInstall } from '@element-plus/utils'
import DraggableTable from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElDraggableTable: SFCWithInstall<typeof DraggableTable> =
  withInstall(DraggableTable)
export default ElDraggableTable

export * from './src/draggable-table'
export type { DraggableTableInstance } from './src/instance'
