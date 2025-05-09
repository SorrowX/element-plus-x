import { buildProps } from '@element-plus/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type {
  ColumnProps,
  Config,
  IHttpRequestParams,
  PaginationProp,
} from './types'

export const getDefaultPagination = () => {
  return {
    defaultPageSize: 50,
    pageSizes: [10, 20, 50, 100, 200],
    layout: 'sizes, prev, pager, next, jumper',
    background: true,
    showRecord: true,
    showTotal: true,
  }
}

export const getDefaultConfig = (): Config => {
  return {
    currentPage: 'current',
    pageSize: 'size',
    total: 'total',
  }
}

export const tablePageProps = buildProps({
  httpRequest: {
    type: Function as PropType<(params: IHttpRequestParams) => void>,
  },
  columns: {
    type: Array as PropType<ColumnProps[]>,
    default: () => [],
  },
  pagination: {
    type: Object as PropType<PaginationProp>,
    default: () => getDefaultPagination(),
  },
  config: {
    type: Object as PropType<Config>,
    default: () => getDefaultConfig(),
  },
  firstInvoke: {
    type: Boolean,
    default: true,
  },
  boundaryValue: {
    type: Number,
    default: 680,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
} as const)
export type TablePageProps = ExtractPropTypes<typeof tablePageProps>

export const tablePageEmits = {}
export type TablePageEmits = typeof tablePageEmits
