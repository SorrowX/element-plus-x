import { withInstall } from '@element-plus/utils'
import PreviewFile from './src/preview-file.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElPreviewFile: SFCWithInstall<typeof PreviewFile> =
  withInstall(PreviewFile)
export default ElPreviewFile

export * from './src/preview-file'
export * from './src/helper'
export type { PreviewFileInstance } from './src/instance'
