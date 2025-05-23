import { computed, defineComponent, h, provide, unref } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { configProviderV2Props } from './config-provider-v2-props'
import { configProviderV2ContextKey } from './constants'
import {
  getCfgOptions,
  getDefaultTablePageConfig,
  globalConfig,
  tablePageContextKey,
} from './hooks/use-global-config'

import type { TablePageContext } from '@element-plus/components/table-page'

const ConfigProviderV2 = defineComponent({
  name: 'ElConfigProviderV2',
  inheritAttrs: false,
  props: configProviderV2Props,
  setup(props, { attrs, slots }) {
    const cfgs = computed(() => getCfgOptions({ ...props, ...attrs }))

    provide(configProviderV2ContextKey, globalConfig)

    const defaultTablePageConfig = getDefaultTablePageConfig()
    const tablePageConfig = props.tablePage as TablePageContext
    provide(
      tablePageContextKey,
      computed(() => {
        return {
          pagination: {
            ...defaultTablePageConfig.pagination,
            ...tablePageConfig?.pagination,
          },
          config: {
            ...defaultTablePageConfig.config,
            ...tablePageConfig?.config,
          },
        }
      })
    )

    return () =>
      h(
        ElConfigProvider,
        {
          ...unref(cfgs.value.epCfg),
        },
        {
          default: () => slots.default?.(),
        }
      )
  },
})
export type ConfigProviderV2Instance = InstanceType<typeof ConfigProviderV2>

export default ConfigProviderV2
