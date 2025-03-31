import { withInstall } from '@element-plus/utils'
import ArrayItems from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElArrayItems: SFCWithInstall<typeof ArrayItems> =
  withInstall(ArrayItems)
export default ElArrayItems

export * from './src/index'
