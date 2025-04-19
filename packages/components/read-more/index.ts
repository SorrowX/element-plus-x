import { withInstall } from '@element-plus/utils'
import ReadMore from './src/read-more.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElReadMore: SFCWithInstall<typeof ReadMore> = withInstall(ReadMore)
export default ElReadMore

export * from './src/read-more'
export type { ReadMoreInstance } from './src/instance'
