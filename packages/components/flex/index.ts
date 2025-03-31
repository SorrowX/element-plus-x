// https://github.com/vueComponent/ant-design-vue/tree/main/components/flex

import { withInstall } from '@element-plus/utils'
import Flex from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElFlex: SFCWithInstall<typeof Flex> = withInstall(Flex)
export default ElFlex

export * from './src/flex'
export type { FlexInstance } from './src/instance'
