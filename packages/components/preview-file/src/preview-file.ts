import { buildProps, definePropType, mutable } from '@element-plus/utils'
import type { UploadUserFile } from 'element-plus'

import type { Component, ExtractPropTypes } from 'vue'

export interface FileMeta {
  name: string
  fileName: string
  fileNameSuffix: string
  size: string
  type: string
  icon: Component
  iconColor: string
  iconSize: number
}

export interface FileItem {
  data: UploadUserFile
  meta: FileMeta
}

export const previewFileProps = buildProps({
  fileList: {
    type: definePropType<UploadUserFile[]>(Array),
    default: () => mutable([] as const),
  },
} as const)
export type PreviewFileProps = ExtractPropTypes<typeof previewFileProps>

export const previewFileEmits = {
  click: (item: FileItem) => !!item,
}
export type PreviewFileEmits = typeof previewFileEmits
