import { withInstall } from '@element-plus/utils'
import Editor from './src/editor.vue'
import EditorToolbar from './src/toolbar/index.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElEditor: SFCWithInstall<typeof Editor> = withInstall(Editor)
export default ElEditor

export const ElEditorToolbar: SFCWithInstall<typeof EditorToolbar> =
  withInstall(EditorToolbar)

export * from './src/editor'
export * from './src/types'
export type { EditorInstance } from './src/instance'
