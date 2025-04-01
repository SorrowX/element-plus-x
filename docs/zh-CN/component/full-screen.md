---
title: FullScreen 全屏
lang: zh-CN
---

# FullScreen 全屏

全屏显示内容

## 基础用法

默认插槽抛出 `enter` `exit` `toggle` `isFullscreen` `appendTo`
:::demo `enter` `exit` `toggle` 默认切换的是`window`类型

full-screen/basic

:::

## 浏览器全屏

type 设置为 `browser`，则是浏览器全屏
:::demo 当类型为`browser`时，使用`tooltip`或者`popover`组件时需要使用`appendTo`属性

full-screen/browser

:::

## API

### 属性

| 属性名 | 说明       | 类型                       | 默认值 |
| ------ | ---------- | -------------------------- | ------ |
| tag    | 根元素标签 | ^[String]                  | div    |
| type   | 全屏类型   | ^[enmu]`window \| browser` | window |

### Exposes

| 名称         | 详情                       | 类型                                               |
| ------------ | -------------------------- | -------------------------------------------------- |
| enter        | 打开弹窗                   | ^[Function]`(type: 'window' \| 'browser') => void` |
| exit         | 关闭弹窗                   | ^[Function]`(type: 'window' \| 'browser') => void` |
| toggle       | 切换弹窗                   | ^[Function]`(type: 'window' \| 'browser') => void` |
| isFullscreen | 是否全屏                   | ^[Boolean]`Ref<boolean>`                           |
| appendTo     | 用于 el 弹窗追加或者挂载点 | ^[Object]`Ref<HTMLDivElement>`                     |
