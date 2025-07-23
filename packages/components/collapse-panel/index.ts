import { withInstall } from '@element-plus/utils'
import CollapsePanel from './src/collapse-panel.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElCollapsePanel: SFCWithInstall<typeof CollapsePanel> =
  withInstall(CollapsePanel)
export default ElCollapsePanel

export * from './src/collapse-panel'
export type { CollapsePanelInstance } from './src/instance'
