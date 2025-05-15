import { computed, defineComponent, h, provide, unref } from 'vue'
import {
  ElConfigProvider,
  configProviderProps,
  provideGlobalConfig,
} from 'element-plus'
import { configProviderV2Props } from './config-provider-v2-props'
import { configProviderV2ContextKey } from './constants'
import {
  defaultTablePageConfig,
  tablePageContextKey,
} from './hooks/use-global-config'
import type { ConfigProviderV2Context } from './constants'
import type { Ref } from 'vue'

const ConfigProviderV2 = defineComponent({
  name: 'ElConfigProviderV2',
  inheritAttrs: false,
  props: configProviderV2Props,
  setup(props, { slots }) {
    const pickupProps = (obj: Record<string, any>) =>
      Object.keys(obj).reduce((pre, key) => {
        return {
          ...pre,
          [key]: (props as any)[key],
        }
      }, {})

    const epCfg = computed(() => pickupProps(configProviderProps)) // element-plus config
    const allCfg: Ref<ConfigProviderV2Context> = provideGlobalConfig(props)! // all config

    provide(configProviderV2ContextKey, allCfg)

    provide(
      tablePageContextKey,
      computed(() => props.tablePage ?? { ...defaultTablePageConfig })
    )

    return () =>
      h(
        ElConfigProvider,
        {
          ...unref(epCfg), // 防止vue报警告，因为ElConfigProvider没有根元素,只能传递该组件的原有props属性
        },
        {
          default: () => slots.default?.(),
        }
      )
  },
})
export type ConfigProviderV2Instance = InstanceType<typeof ConfigProviderV2>

export default ConfigProviderV2
