---
title: CollapsePanel 折叠面板
lang: zh-CN
---

# CollapsePanel 折叠面板

用于折叠子内容

## 基础用法

`title`设置标题

:::demo 默认插槽为子内容

collapse-panel/basic

:::

## 设置展开状态

`collapse`设置字内容是否默认展开还是折叠

:::demo

collapse-panel/collapse

:::

## 设置虚线

`dashed`设置虚线

:::demo `disabled`可以关闭折叠功能

collapse-panel/dashed

:::

## action 插槽

使用`action`插槽来放置一些操作

:::demo

collapse-panel/action

:::

## API

### 属性

| 属性名   | 说明                   | 类型       | 默认值 |
| -------- | ---------------------- | ---------- | ------ |
| title    | 标题                   | ^[String]  | -      |
| disabled | 关闭折叠功能           | ^[Boolean] | -      |
| collapse | 默认是否折叠           | ^[Boolean] | -      |
| dashed   | 头部是否含有虚线       | ^[Boolean] | -      |
| lazy     | 是否展开渲染(延迟渲染) | ^[Boolean] | -      |

### Slots

| 事件名  | 说明                       |
| ------- | -------------------------- |
| trigger | 会覆盖 arrow 和 title 内容 |
| arrow   | 自定义 arrow 内容          |
| title   | 自定义 title 内容          |
| action  | 自定义 action 内容         |
| default | 子内容                     |

### Event

| 名称   | 详情       | 类型                                     |
| ------ | ---------- | ---------------------------------------- |
| change | 展开，收起 | ^[Function]`(collapse: boolean) => void` |
