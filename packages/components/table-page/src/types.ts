import type { VNode } from 'vue'
import type { PaginationProps, TableColumnCtx } from 'element-plus'

export type DefaultRow = any

export type CI<T> = {
  column: TableColumnCtx<T>
  $index: number
}

export type CRI<T> = {
  column: TableColumnCtx<T>
  row: DefaultRow
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

export type IQueryParams = {
  [key: string]: any
}

export type PaginationProp = PaginationProps & {
  defaultPageSize?: number
  showRecord?: boolean
  showTotal?: boolean
}

export type IResolveData = {
  list: any[]
  total: number
}

export type IHttpRequestParams = {
  params: IQueryParams
  resolve: (data: IResolveData) => void
  reject: (e: Error) => void
}

export interface TablePageContext {
  pagination: Partial<PaginationProp>
  config?: Partial<Config>
}
