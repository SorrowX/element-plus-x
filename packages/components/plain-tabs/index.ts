import { withInstall } from '@element-plus/utils'
import PlainTabs from './src/plain-tabs.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElPlainTabs: SFCWithInstall<typeof PlainTabs> =
  withInstall(PlainTabs)
export default ElPlainTabs

export * from './src/plain-tabs'
export type { PlainTabsInstance } from './src/instance'
