---
title: 安装
lang: zh-CN
---

# 安装

## 使用包管理器

**我们建议您使用包管理器（如 NPM、[Yarn](https://classic.yarnpkg.com/lang/en/) 或 [pnpm](https://pnpm.io/)）安装 Element Plus**，然后您就可以使用打包工具，例如 [Vite](https://vitejs.dev) 或 [webpack](https://webpack.js.org/)。

# 选择一个你喜欢的包管理器

::: code-group

```shell [npm]
$ npm install element-plus element-plus-x --save
```

```shell [yarn]
$ yarn add element-plus element-plus-x
```

```shell [pnpm]
$ pnpm install element-plus element-plus-x
```

:::

:::tip
`element-plus-x` 依赖 `vue-use`中的 [useAxios](https://vueuse.org/integrations/useAxios/)和[useSortable](https://vueuse.org/integrations/useSortable/),根据`vue-use`文档，需要安装 `axios` 和 `sortablejs`

::: code-group

```shell [npm]
$ npm install axios sortablejs --save
```

```shell [yarn]
$ yarn add axios sortablejs
```

```shell [pnpm]
$ pnpm install axios sortablejs
```

:::

如果你的网络环境不佳，推荐使用 [cnpm](https://github.com/cnpm/cnpm) 或使用 [ npmmirror](https://npmmirror.com/)

```shell
npm config set registry https://registry.npmmirror.com
```

## ~~浏览器直接引入~~

`element-plus-x` 不支持直接通过浏览器的 HTML 标签导入 Element Plus X。

所以推荐通过包管理器安装，配合打包工具使用，请阅读下一节：[快速上手](/zh-CN/guide/quickstart)。

:::tip
`element-plus-x`组件库是`element-plus`的扩展库，强依赖其内部的源代码，比如`element-plus`中的`utils`工具类函数，然而`element-plus`官方
并没有把其工具类抛出。所以`element-plus-x`访问不到全局的`ElementPlus`对象中的某些工具类函数。
:::
