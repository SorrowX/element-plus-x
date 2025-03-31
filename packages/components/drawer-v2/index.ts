import { withInstall } from '@element-plus/utils'
import DrawerV2 from './src/drawer-v2.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElDrawerV2: SFCWithInstall<typeof DrawerV2> = withInstall(DrawerV2)
export default ElDrawerV2

export * from './src/drawer-v2'
export type { DrawerV2Instance } from './src/instance'
