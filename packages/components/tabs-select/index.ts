import { withInstall } from '@element-plus/utils'
import TabsSelect from './src/tabs-select.vue'
import TabsSelectPanel from './src/panel.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElTabsSelect: SFCWithInstall<typeof TabsSelect> =
  withInstall(TabsSelect)
export default ElTabsSelect

export const ElTabsSelectPanel: SFCWithInstall<typeof TabsSelectPanel> =
  withInstall(TabsSelectPanel)

export * from './src/tabs-select'
export type { TabsSelectInstance } from './src/instance'
