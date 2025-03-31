import { CANCEL_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import { buildProps, isArray } from '@element-plus/utils'
import type { ColumnProps } from '@element-plus/components/table-page/src/types'

import type { ExtractPropTypes, PropType } from 'vue'
import type { TableColumnCtx } from 'element-plus'

export const tableDialogProps = buildProps({
  rowKey: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 900,
  },
  height: {
    type: Number,
    default: 500,
  },
  type: {
    type: String,
    values: ['checkbox', 'radio'],
    default: 'checkbox',
  },
  selectable: {
    type: Function as PropType<TableColumnCtx<any>['selectable']>,
  },
  columns: {
    type: Array as PropType<ColumnProps[]>,
    default: () => [],
  },
  pagination: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  config: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({
      id: 'id',
      label: 'label',
    }),
  },
  headerCellStyle: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({
      background: '#EBEEF5',
    }),
  },
  hiddenRight: {
    type: Boolean,
    default: false,
  },
  boundaryValue: {
    type: Number,
    default: 50,
  },
  dynamicSizeListProps: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({}),
  },
  unshift: {
    type: Boolean,
    default: false,
  },
  selectedFieldTitle: {
    type: String,
    default: '',
  },
  cancelText: { type: String },
  sureText: { type: String },
  onSure: {
    type: Function as PropType<(values: any[], options: any) => void>,
  },
} as const)
export type TableDialogProps = ExtractPropTypes<typeof tableDialogProps>

export const tableDialogEmits = {
  [UPDATE_MODEL_EVENT]: (values: any[]) => isArray(values),
  [CANCEL_EVENT]: () => null,
}
export type TableDialogEmits = typeof tableDialogEmits
