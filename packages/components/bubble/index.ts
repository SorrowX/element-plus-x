//引用 github.com/wzc520pyfm/ant-design-x-vue/tree/main/src/bubble

import { withInstall } from '@element-plus/utils'
import Bubble from './src/bubble/index'
import BubbleList from './src/bubble-list/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElBubble: SFCWithInstall<typeof Bubble> = withInstall(Bubble)
export default ElBubble

export const ElBubbleList: SFCWithInstall<typeof BubbleList> =
  withInstall(BubbleList)

export * from './src/bubble/bubble'
export * from './src/bubble-list/bubble-list'
