---
title: AffixBottom
lang: zh-CN
---

# AffixBottom 固定底部

将元素或者组件固定在容器或者 body 底部。

## 基础用法

:::demo 使用 `position` 属性将元素固定在底部，默认 `absolute`，可选值`fixed`

affix-bottom/basic

:::

## 组合使用

:::demo 可以配合`ElementPlus`组件相互组合使用

affix-bottom/table

:::

## API

### 属性

| 属性名   | 说明     | 类型                          | 默认值   |
| -------- | -------- | ----------------------------- | -------- |
| position | 定位方式 | ^[enum]`'absolute'\| 'fixed'` | absolute |
| tag      | 渲染元素 | string                        | div      |
