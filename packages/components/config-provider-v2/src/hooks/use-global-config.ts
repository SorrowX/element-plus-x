import { getCurrentInstance, inject, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { TablePageContext } from '@element-plus/components/table-page'

// table-page 全部配置
export const getDefaultTablePageConfig = () => ({
  pagination: {
    defaultPageSize: 10,
    pageSizes: [10, 20, 50, 100],
    layout: 'sizes, prev, pager, next, jumper',
    background: true,
    showRecord: true,
    showTotal: true,
  },
  config: {
    currentPage: 'current',
    pageSize: 'size',
    total: 'total',
  },
})
export const tablePageContextKey: InjectionKey<Ref<TablePageContext>> = Symbol(
  'tablePageContextKey'
)
export const useTablePageConfig = () => {
  const initial = ref(getDefaultTablePageConfig())

  return {
    tablePageConfig: getCurrentInstance()
      ? inject(tablePageContextKey, initial)
      : initial,
  }
}
