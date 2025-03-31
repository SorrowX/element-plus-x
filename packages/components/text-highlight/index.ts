import { withInstall } from '@element-plus/utils'
import TextHighlight from './src/text-highlight.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElTextHighlight: SFCWithInstall<typeof TextHighlight> =
  withInstall(TextHighlight)
export default ElTextHighlight

export * from './src/text-highlight'
export type { TextHighlightInstance } from './src/instance'
