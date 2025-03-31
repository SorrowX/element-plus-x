---
title: Dot 点
lang: zh-CN
---

# Dot 点

用于装饰文本的前缀

## 基础用法

使用 `type` 属性来选择 dot 的类型。

:::demo

dot/basic

:::

## 不同颜色

使用 `color` 属性来更改 dot 的颜色。

:::demo

dot/color

:::

## 不同尺寸

使用 `size` 属性来设置额外尺寸, 可选值包括 `large` `default` `small` 或者数值 `eg: 10`

:::demo

dot/size

:::

## 配合 Text

建议配合 el-text 组件使用

:::demo

dot/text

:::

## 配合 Table

:::demo

dot/table

:::

## API

### 属性

| 属性名 | 说明       | 类型                                             | 默认值  |
| ------ | ---------- | ------------------------------------------------ | ------- |
| type   | dot 的类型 | ^[enum]`primary\|success\|info\|warning\|danger` | primary |
| color  | 点的背景色 | ^[string]                                        | -       |
| size   | 点的尺寸   | ^[enum]`large\|default\|small\|number`           | -       |

### Slots

| 事件名  | 说明     |
| ------- | -------- |
| default | 默认内容 |
