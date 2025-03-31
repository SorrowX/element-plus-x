import { withInstall } from '@element-plus/utils'
import FullScreen from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElFullScreen: SFCWithInstall<typeof FullScreen> =
  withInstall(FullScreen)
export default ElFullScreen

export * from './src/full-screen'
export type { FullScreenInstance } from './src/instance'
