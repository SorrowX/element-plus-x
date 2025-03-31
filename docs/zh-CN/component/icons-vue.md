---
title: IconsVue 图标组件
lang: zh-CN
---

# IconsVue 图标组件

扩展一些常用的图标组件，这些图标组件需要配合[el-icon](https://element-plus.org/zh-CN/component/icon.html)使用。

这并不是一个丰富的图标组件库，只是`element-plus-x`中的部分组件依赖了这些图标组件，所以也抛出来了。

## 注册所有图标

您需要从 `element-plus-x` 中导入所有图标并进行全局注册。

```ts
// main.ts
import { IconsVue } from 'element-plus-x'

const app = createApp(App)
for (const [key, component] of Object.entries(IconsVue)) {
  app.component(key, component)
}
```

## 基本使用

从`IconsVue`对象中导入所需图标组件
:::demo

icons-vue/basic

:::

## 图标集合

点击对应的图标，复制代码
:::demo

icons-vue/list

:::
