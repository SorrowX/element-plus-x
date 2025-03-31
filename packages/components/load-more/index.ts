import { withInstall } from '@element-plus/utils'
import LoadMore from './src/load-more.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElLoadMore: SFCWithInstall<typeof LoadMore> = withInstall(LoadMore)
export default ElLoadMore

export * from './src/load-more'
export type { LoadMoreInstance } from './src/instance'
