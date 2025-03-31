import { withInstall } from '@element-plus/utils'
import Case from './src/case.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElCase: SFCWithInstall<typeof Case> = withInstall(Case)
export default ElCase

export * from './src/case'
export type { CaseInstance } from './src/instance'
