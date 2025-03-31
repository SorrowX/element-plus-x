---
title: Renderer 渲染器
lang: zh-CN
---

# Renderer 渲染器

有时需要在 `template` 里使用渲染函数。

## 基础用法

`renderMsg`函数返回`VNode`即可，`data`对象是`renderMsg`函数的参数

:::demo

renderer/basic

:::

## 配合组件

配合其他组件返回的数据来使用 renderer

:::demo

renderer/file

:::

## 默认插槽

如果没有提供`renderer`函数，则渲染默认插槽中的内容

:::demo 这是无状态渲染，并不会在内容上包裹其他元素

renderer/slot

:::

## API

### 属性

| 属性名   | 说明                 | 类型                           | 默认值 |
| -------- | -------------------- | ------------------------------ | ------ |
| renderer | 渲染函数，返回 VNode | ^[Function]                    | -      |
| data     | 渲染函数的参数       | ^[Object]`Record<string, any>` | -      |

### Slots

| 事件名  | 说明             |
| ------- | ---------------- |
| default | 对话框的默认内容 |
