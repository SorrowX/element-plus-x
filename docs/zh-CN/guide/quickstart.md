---
title: 快速开始
lang: zh-CN
---

# 快速开始

本节将介绍如何在项目中使用 Element Plus X。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```ts
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import ElementPlusX from 'element-plus-x'
import 'element-plus/dist/index.css'
import 'element-plus-x/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(ElementPlusX)
app.mount('#app')
```

### ~~自动导入~~

TODO

### 手动导入

Element Plus X 提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。

但你需要安装 [unplugin-element-plus](https://github.com/element-plus/unplugin-element-plus) 来导入样式。 配置文档参考 [docs](https://github.com/element-plus/unplugin-element-plus#readme).

> App.vue

```html
<template>
  <el-editor ref="value" />
</template>
<script setup>
  import { ref } from 'vue'
  import { ElEditor } from 'element-plus-x'
</script>
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  // ...
  plugins: [
    ElementPlus({
      lib: 'element-plus-x',
    }),
    ElementPlus({
      lib: 'element-plus',
    }),
  ],
})
```

## 全局配置

所有的全局配置，请使用[ElementPlus 全局配置](https://element-plus.org/zh-CN/guide/quickstart.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE)，因为 ElementPlusX 内部就是使用 ElementPlus 的全局配置，所以配置一份即可。

## 开始使用

现在你可以启动项目了。 对于每个组件的用法，请查阅 对应的独立文档。
