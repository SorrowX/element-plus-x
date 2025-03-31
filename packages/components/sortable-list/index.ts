import { withInstall } from '@element-plus/utils'
import SortableList from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElSortableList: SFCWithInstall<typeof SortableList> =
  withInstall(SortableList)
export default ElSortableList

export * from './src/sortable-list'
export type { SortableListInstance } from './src/instance'
