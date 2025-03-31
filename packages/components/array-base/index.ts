import { withInstall } from '@element-plus/utils'
import ArrayBase from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElArrayBase: SFCWithInstall<typeof ArrayBase> =
  withInstall(ArrayBase)
export default ElArrayBase

export * from './src/index'
