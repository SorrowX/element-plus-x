---
title: SortableList 可排序列表
lang: zh-CN
---

# SortableList 可排序列表

简单的列表排序

## 基础用法

使用`v-model`来双向绑定列表值

:::demo 默认插槽内容为每一项数据

sortable-list/basic

:::

## 指定拖动元素

使用`options`来进行传参,值为[Sortable.options](https://github.com/SortableJS/Sortable#options)

:::demo

sortable-list/icon

:::

## API

### 属性

| 属性名      | 说明                                                               | 类型            | 默认值 |
| ----------- | ------------------------------------------------------------------ | --------------- | ------ |
| model-value | 列表数据                                                           | ^[Array]`any[]` | -      |
| options     | [Sortable.options](https://github.com/SortableJS/Sortable#options) | ^[Object]       | -      |
| tag         | 标签元素                                                           | ^[String]       | div    |

### Slots

| 事件名  | 说明       | 参数                         |
| ------- | ---------- | ---------------------------- |
| default | 每一项内容 | `{data: any, index: number}` |

### Event

| 事件名 | 说明         | 参数    |
| ------ | ------------ | ------- |
| change | 排序后的数据 | `any[]` |
