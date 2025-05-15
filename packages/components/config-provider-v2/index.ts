import { withInstall } from '@element-plus/utils'

import ConfigProviderV2 from './src/config-provider-v2'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElConfigProviderV2: SFCWithInstall<typeof ConfigProviderV2> =
  withInstall(ConfigProviderV2)
export default ElConfigProviderV2

export * from './src/constants'
export * from './src/config-provider-v2'
export * from './src/config-provider-v2-props'
export * from './src/hooks/use-global-config'
