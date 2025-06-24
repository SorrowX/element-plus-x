import { buildProps, isArray } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const draggableTableProps = buildProps({
  draggableProps: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
} as const)
export type DraggableTableProps = ExtractPropTypes<typeof draggableTableProps>

export const draggableTableEmits = {
  'sort-data': (data: any[]) => isArray(data),
}
export type DraggableTableEmits = typeof draggableTableEmits
