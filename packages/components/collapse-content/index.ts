import { withInstall } from '@element-plus/utils'
import CollapseContent from './src/collapse-content.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElCollapseContent: SFCWithInstall<typeof CollapseContent> =
  withInstall(CollapseContent)
export default ElCollapseContent

export * from './src/collapse-content'
export type { CollapseContentInstance } from './src/instance'
