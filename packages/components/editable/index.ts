import { withInstall } from '@element-plus/utils'
import Editable from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElEditable: SFCWithInstall<typeof Editable> = withInstall(Editable)
export default ElEditable

export * from './src/editable'
