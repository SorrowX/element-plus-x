import { withInstall } from '@element-plus/utils'
import List from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElList: SFCWithInstall<typeof List> = withInstall(List)
export default ElList

export * from './src/list'
export type { ListInstance } from './src/instance'
