import { withInstall } from '@element-plus/utils'
import Ellipsis from './src/ellipsis.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElEllipsis: SFCWithInstall<typeof Ellipsis> = withInstall(Ellipsis)
export default ElEllipsis

export * from './src/ellipsis'
export type { EllipsisInstance } from './src/instance'
