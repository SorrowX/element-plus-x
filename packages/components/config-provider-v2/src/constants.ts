import type { ConfigProviderV2Props } from './config-provider-v2-props'
import type { InjectionKey, Ref } from 'vue'

export type ConfigProviderV2Context = Partial<ConfigProviderV2Props>

export const configProviderV2ContextKey: InjectionKey<
  Ref<ConfigProviderV2Context>
> = Symbol()
