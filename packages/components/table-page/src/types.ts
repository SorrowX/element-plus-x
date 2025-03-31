import type { VNode } from 'vue'
import type { PaginationProps, TableColumnCtx } from 'element-plus'

export type CI<T> = {
  column: TableColumnCtx<T>
  $index: number
}

export type CRI<T> = {
  column: TableColumnCtx<T>
  row: any
  $index: number
}

export type ColumnProps<T = any> = TableColumnCtx<T> & {
  cellRenderer?: (data: CRI<T>) => VNode
  headerCellRenderer?: (data: CI<T>) => VNode
  reserveRadioSelection?: boolean
}

export interface Config {
  currentPage: string
  pageSize: string
  total: string
}

export type queryParams = {
  [key: string]: any
}

export type PaginationProp = PaginationProps & {
  defaultPageSize?: number
  showRecord?: boolean
  showTotal?: boolean
}
