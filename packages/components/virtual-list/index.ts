import { withInstall } from '@element-plus/utils'
import VirtualList from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElVirtualList: SFCWithInstall<typeof VirtualList> =
  withInstall(VirtualList)
export default ElVirtualList

export * from './src/virtual-list'
export type { VirtualListInstance } from './src/instance'
