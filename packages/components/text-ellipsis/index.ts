import { withInstall } from '@element-plus/utils'
import TextEllipsis from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElTextEllipsis: SFCWithInstall<typeof TextEllipsis> =
  withInstall(TextEllipsis)
export default ElTextEllipsis

export * from './src/text-ellipsis'
export type { TextEllipsisInstance } from './src/instance'
