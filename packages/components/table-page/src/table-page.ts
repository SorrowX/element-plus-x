import { buildProps } from '@element-plus/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type {
  ColumnProps,
  Config,
  IHttpRequestParams,
  PaginationProp,
} from './types'

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
    default: () => ({}),
  },
  config: {
    type: Object as PropType<Config>,
    default: () => ({}),
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
