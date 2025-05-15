import { Component, createApp } from 'vue'
import ElementPlus from 'element-plus'
import ElementPlusX from 'element-plus-x'
import 'element-plus/theme-chalk/src/index.scss'
import 'element-plus/theme-chalk/src/dark/css-vars.scss'
import '../packages/theme-chalk/src/index.scss'
import '../packages/theme-chalk/src/dark/css-vars.scss'
;(async () => {
  const apps = import.meta.glob<
    true,
    string,
    () => Promise<{ default: Component }>
  >('./src/*.vue')
  const name = location.pathname.replace(/^\//, '') || 'App'
  const file = apps[`./src/${name}.vue`]
  if (!file) {
    location.pathname = 'App'
    return
  }
  const App = (await file()).default
  const app = createApp(App)

  app.use(ElementPlus)
  app.use(ElementPlusX, {
    size: 'small',
  })

  app.mount('#play')
})()
