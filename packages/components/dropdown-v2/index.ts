import { withInstall } from '@element-plus/utils'
import DropdownV2 from './src/index'
import DropdownV2Panel from './src/panel'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElDropdownV2Panel: SFCWithInstall<typeof DropdownV2Panel> =
  withInstall(DropdownV2Panel)

export const ElDropdownV2: SFCWithInstall<typeof DropdownV2> =
  withInstall(DropdownV2)
export default ElDropdownV2

export * from './src/dropdown-v2'
export type { DropdownV2Instance } from './src/instance'
