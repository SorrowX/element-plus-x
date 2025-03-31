import { withInstall } from '@element-plus/utils'
import SelectV3 from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElSelectV3: SFCWithInstall<typeof SelectV3> = withInstall(SelectV3)
export default ElSelectV3

export * from './src/select-v3'
export type { SelectV3Instance } from './src/instance'
