---
title: ConfigProviderV2
lang: zh-CN
---

# ConfigProviderV2 全局配置

[ElConfigProvider](https://element-plus.org/zh-CN/component/config-provider.html)配置能够在全局都能够被访问到。`ConfigProviderV2`组件继承了`ElConfigProvider`组件的所有功能且扩展了一些其他的全局配置文件。

使用姿势只需改变一个单词即可, `el-config-provider => el-config-provider-v2`

```vue
<el-config-provider :locale="locale">
  <el-button>按钮</el-button>
</el-config-provider>

改成如下即可:

<el-config-provider-v2 :locale="locale">
  <el-button>按钮</el-button>
</el-config-provider-v2>
```

## i18n 配置

配置多语言，且和`ElementPlus`国际化共存

:::demo `tablePage`属性是`ConfigProviderV2`独有的，所以当你需要配置表格默认值时可以使用`ConfigProviderV2`组件即可。

config-provider-v2/local

:::

## 初始化安装

除了使用`ConfigProvider`或者`ConfigProviderV2`组件来配置，也可以在组件库安装时传入全局的配置，如下

```ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import ElementPlusX from 'element-plus-x'
import App from './app.vue'

const app = createApp(App)

app.use(ElementPlus, {
  size: 'small',
})
app.use(ElementPlusX, {
  tablePage: {
    pagination: { showRecord: false },
  },
})
```

## API

其余使用姿势参考[ElConfigProvider](https://element-plus.org/zh-CN/component/config-provider.html),剩下的则是`ConfigProviderV2`组件独有的

### 属性

| 属性名     | 说明                    | 类型                        | 默认值 |
| ---------- | ----------------------- | --------------------------- | ------ |
| table-page | 全局配置 TablePage 组件 | ^[object]`TablePageContext` | -      |
