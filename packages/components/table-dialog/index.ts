import { withInstall } from '@element-plus/utils'
import TableDialog from './src/table-dialog.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElTableDialog: SFCWithInstall<typeof TableDialog> =
  withInstall(TableDialog)
export default ElTableDialog

export * from './src/table-dialog'
export type { TableDialogInstance } from './src/instance'
