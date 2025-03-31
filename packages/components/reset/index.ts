import { withInstall } from '@element-plus/utils'
import Reset from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElReset: SFCWithInstall<typeof Reset> = withInstall(Reset)
export default ElReset

export * from './src/reset'
export type { ResetInstance } from './src/instance'
