---
title: PlainTabs 普通的标签页
lang: zh-CN
---

# PlainTabs 普通的标签页

相比`ElTabs`，该组件只是一个普通的 tab 切换，不包含延迟渲染，缓存渲染功能，但在外层也可以轻松做到。

## 基础用法

传入`options`选项来渲染 tab 列表，使用`v-model`来绑定 tab 值

:::demo

plain-tabs/basic

:::

## 卡片风格的标签

传入`type`为`card`来渲染卡片风格

:::demo 建议配合`component`组件来使用，这样会使代码变得清晰

plain-tabs/card

:::

## 缓存

配合`keep-alive`组件来缓存组件实例

:::demo

plain-tabs/keep-alive

:::

## 动画

默认插槽抛出了`action`和`transitionName`2 个属性，方便应用到组件上

:::demo 用户也可以根据`action`的值(next：点击当前选中后面的 tab, prev：点击当前选中前面的 tab)，使用自定义的动画名称

plain-tabs/transition

:::

## API

### 属性

| 属性名      | 说明             | 类型                      | 默认值 |
| ----------- | ---------------- | ------------------------- | ------ |
| model-value | tab 双向绑定的值 | ^[String\|Number]         | -      |
| options     | 取消按钮属性设置 | ^[Array]`PlainTabsOption` | -      |
| type        | 确定按钮属性设置 | ^[String]`line\|card`     | -      |

### Slots

| 事件名  | 说明                             |
| ------- | -------------------------------- |
| default | 面板内容                         |
| label   | 自定义 label                     |
| prepend | 前置插槽(只有 card 模式时才生效) |
| append  | 后置插槽(只有 card 模式时才生效) |
