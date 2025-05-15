import { INSTALLED_KEY } from '@element-plus/constants'
import {
  ConfigProviderV2Context,
  getCfgOptions,
  mergeGlobalConfig,
} from '@element-plus/components/config-provider-v2'
import { version } from './version'

import type { App, Plugin } from '@vue/runtime-core'

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderV2Context) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach((c) => app.use(c))

    if (options) {
      const { epxCfg } = getCfgOptions(options)
      mergeGlobalConfig(epxCfg)
    }
  }

  return {
    version,
    install,
  }
}
