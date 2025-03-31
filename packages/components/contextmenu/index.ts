import { withInstall } from '@element-plus/utils'
import Contextmenu from './src/contextmenu.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElContextmenu: SFCWithInstall<typeof Contextmenu> =
  withInstall(Contextmenu)
export default ElContextmenu

export * from './src/contextmenu'
export type { ContextmenuInstance } from './src/instance'
