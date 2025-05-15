import { getCurrentInstance, inject, ref } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import type { TablePageContext } from '../config-provider-v2-props'

// table-page 全部配置
export const defaultTablePageConfig = {
  defaultPageSize: 10,
}
export const tablePageContextKey: InjectionKey<Ref<TablePageContext>> = Symbol(
  'tablePageContextKey'
)
export const useTablePageConfig = (): {
  tablePageConfig: Ref<TablePageContext>
} => {
  const initial = ref({ ...defaultTablePageConfig })

  return {
    tablePageConfig: getCurrentInstance()
      ? inject(tablePageContextKey, initial)
      : initial,
  }
}
