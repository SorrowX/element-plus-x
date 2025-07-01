import { withInstall } from '@element-plus/utils'
import Resizable from './src/resizable.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElResizable: SFCWithInstall<typeof Resizable> =
  withInstall(Resizable)
export default ElResizable

export * from './src/resizable'
export type { ResizableInstance } from './src/instance'
