import { computed, getCurrentInstance, inject, ref } from 'vue'
import { configProviderProps } from 'element-plus'
import { merge } from '@element-plus/utils'
import { cfgProps } from '../config-provider-v2-props'
import type { InjectionKey, Ref } from 'vue'
import type { TablePageContext } from '@element-plus/components/table-page'
import type { ConfigProviderV2Context } from '../constants'

export const getCfgOptions = (options: ConfigProviderV2Context) => {
  const pickupProps = (obj: Record<string, any>) =>
    Object.keys(obj).reduce((pre, key) => {
      return {
        ...pre,
        [key]: (options as any)[key],
      }
    }, {})
  return {
    epCfg: pickupProps(configProviderProps),
    epxCfg: pickupProps(cfgProps),
  }
}

export const globalConfig = ref<ConfigProviderV2Context>({})

export const mergeGlobalConfig = (cfg: ConfigProviderV2Context) => {
  globalConfig.value = merge(globalConfig.value, cfg)
}

// table-page 全部配置
export const getDefaultTablePageConfig = () => {
  return {
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
  }
}
export const tablePageContextKey: InjectionKey<Ref<TablePageContext>> = Symbol(
  'tablePageContextKey'
)
export const useTablePageConfig = () => {
  const initial = computed(() =>
    merge(getDefaultTablePageConfig(), globalConfig.value.tablePage ?? {})
  )

  return {
    tablePageConfig: getCurrentInstance()
      ? inject(tablePageContextKey, initial)
      : initial,
  }
}
