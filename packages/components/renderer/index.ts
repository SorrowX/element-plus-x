import { withInstall } from '@element-plus/utils'
import Renderer from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElRenderer: SFCWithInstall<typeof Renderer> = withInstall(Renderer)
export default ElRenderer

export * from './src/renderer'
export type { RendererInstance } from './src/instance'
