import { withInstall } from '@element-plus/utils'
import DialogV2 from './src/dialog-v2.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElDialogV2: SFCWithInstall<typeof DialogV2> = withInstall(DialogV2)
export default ElDialogV2

export * from './src/dialog-v2'
export type { DialogV2Instance } from './src/instance'
