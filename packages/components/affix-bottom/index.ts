import { withInstall } from '@element-plus/utils'
import AffixBottom from './src/affix-bottom.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElAffixBottom: SFCWithInstall<typeof AffixBottom> =
  withInstall(AffixBottom)
export default ElAffixBottom

export * from './src/affix-bottom'
export type { AffixBottomInstance } from './src/instance'
