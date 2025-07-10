// 引用 https://github.com/kirillmurashov/vue-drag-resize

import { withInstall } from '@element-plus/utils'
import Resizable from './src/index.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElResizable: SFCWithInstall<typeof Resizable> =
  withInstall(Resizable)
export default ElResizable

export * from './src/resizable'
export type { ResizableInstance } from './src/instance'
