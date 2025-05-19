import { computed, getCurrentInstance, inject, ref, toRaw } from 'vue'
import { configProviderProps } from 'element-plus'
import { mergeWith } from 'lodash-unified'
import { configProviderV2Props } from '../config-provider-v2-props'
import type { InjectionKey, Ref } from 'vue'
import type { ConfigProviderProps } from 'element-plus'
import type { TablePageContext } from '@element-plus/components/table-page'
import type { ConfigProviderV2Context } from '../constants'

const overrideKeys = ['pageSizes']
function merge<T extends Partial<ConfigProviderV2Context> | object>(
  ...sources: T[]
): T {
  return mergeWith(
    {},
    ...sources,
    (objValue: any, srcValue: any, key: string) => {
      if (overrideKeys.includes(key)) {
        return srcValue
      }
      return undefined
    }
  )
}

export const getCfgOptions = <
  T extends Partial<ConfigProviderV2Context & ConfigProviderProps>
>(
  options: T
) => {
  const pickupProps = (props: Record<string, any>) => {
    const result: Record<string, any> = {}
    Object.keys(props).forEach((key: string) => {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        result[key] = (options as any)[key]
      }
    })
    return result
  }
  return {
    epCfg: pickupProps(configProviderProps),
    epxCfg: pickupProps(configProviderV2Props),
  }
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
    merge(
      getDefaultTablePageConfig() as TablePageContext,
      globalConfig.value.tablePage as TablePageContext
    )
  )
  return {
    tablePageConfig: getCurrentInstance()
      ? inject(tablePageContextKey, initial as Ref<TablePageContext>)
      : initial,
  }
}

// 只存 app.use(ElementPlusX, options) 的配置
export const globalConfig = ref<ConfigProviderV2Context>({
  tablePage: getDefaultTablePageConfig(),
})

export const mergeGlobalConfig = (cfg: ConfigProviderV2Context) => {
  globalConfig.value = merge({}, toRaw(globalConfig.value), cfg)
}
