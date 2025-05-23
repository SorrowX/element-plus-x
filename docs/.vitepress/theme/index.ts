import ElementPlusX from 'element-plus-x'
import ElementPlus, {
  ID_INJECTION_KEY,
  ZINDEX_INJECTION_KEY,
} from 'element-plus'

import VPApp, { NotFound, globals } from '../vitepress'
import { define } from '../utils/types'

import 'uno.css'
import './style.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import type { Theme } from 'vitepress'

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.provide(ID_INJECTION_KEY, { prefix: 1024, current: 0 })
    app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
    app.use(ElementPlusX)
    app.use(ElementPlus, {})

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
