// https://github.com/vexip-ui/vexip-ui/blob/main/components/split/split.vue 的阉割版

import { withInstall } from '@element-plus/utils'
import Split from './src/split.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElSplit: SFCWithInstall<typeof Split> = withInstall(Split)
export default ElSplit

export * from './src/split'
export type { SplitInstance } from './src/instance'
