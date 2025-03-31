---
title: Ellipsis
lang: zh-CN
---

# Ellipsis 省略

任意内容超出时，自动出现触发器

## 基础用法

需要指定 `el-ellipsis` 组件的宽度
:::demo 如果只是文本省略，建议使用 `text-ellipsis` 组件的交互。

ellipsis/basic

:::

## 行数

使用 `rows` 来指定行数省略
:::demo

ellipsis/rows

:::

## 非文字

使用 `action` 插槽来定制化触发器
:::demo

ellipsis/tag

:::

## 弹窗内容

默认 popup 弹窗的内容是默认插槽内容，但也可以定制化。
:::demo 使用 `content` 插槽来定制化弹窗内容

ellipsis/content

:::

## 配合 table

配合 table 组件使用
:::demo

ellipsis/table

:::

## API

### 属性

| 属性名                                                           | 说明                   | 类型 | 默认值 |
| ---------------------------------------------------------------- | ---------------------- | ---- | ------ |
| rows                                                             | 当内容是文本时，必须传 | -    | -      |
| [tooltip](https://element-plus.org/zh-CN/component/tooltip.html) | 参考 tooltip 组件属性  | -    | -      |

### Slots

| 插槽名  | 说明           | 参数 |
| ------- | -------------- | ---- |
| default | 默认内容       | -    |
| action  | 自定义触发器   | -    |
| content | 自定义弹窗内容 | -    |
