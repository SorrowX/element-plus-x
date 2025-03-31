---
title: 自定义命名空间
lang: zh-CN
---

## 自定义命名空间 ^(2.2.0)

更改命名空间是个不错的功能。举个例子，使用微前端框架，假设主应用是 vue3 + ep,子应用是 vue2 + el。

element-ui 和 element-plus 样式如果都是以 el 开头的话，可能会出现样式覆盖的问题，如果这时候主应用使用 ep 开头则能避免，这无疑是棒到掉渣的功能。

由于 element-plus-x 本身就是基于 element-plus 其内部很多的方法去开发，比如，命名规范，全局配置，国际化

所以自定义命名空间直接参考 [element-plus 自定义命名空间](https://element-plus.org/zh-CN/guide/namespace.html) 即可
