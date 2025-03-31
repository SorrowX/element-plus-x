import { withInstall } from '@element-plus/utils'
import Dot from './src/dot.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElDot: SFCWithInstall<typeof Dot> = withInstall(Dot)
export default ElDot

export * from './src/dot'
export type { DotInstance } from './src/instance'
