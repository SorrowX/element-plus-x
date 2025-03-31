import { withInstall } from '@element-plus/utils'
import Submit from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElSubmit: SFCWithInstall<typeof Submit> = withInstall(Submit)
export default ElSubmit

export * from './src/submit'
export type { SubmitInstance } from './src/instance'
