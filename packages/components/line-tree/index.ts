import { withInstall } from '@element-plus/utils'
import LineTree from './src/line-tree.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElLineTree: SFCWithInstall<typeof LineTree> = withInstall(LineTree)
export default ElLineTree

export * from './src/line-tree'
export type { LineTreeInstance } from './src/instance'
