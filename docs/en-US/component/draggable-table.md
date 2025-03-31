---
title: DraggableTable
lang: zh-CN
---

# DraggableTable 可拖拽表格

表格展示数据，有时会拖动排序，传给后端。

基于 [vue.draggable.next](https://github.com/SortableJS/vue.draggable.next) 开发,`element-plus-x` 并不会打包它，所以你的项目需要安装它。

## 基本使用

:::demo 必须使用 `el-table` 组件的 `row-key` 属性。其他属性同 `el-table` 组件。默认整行可以拖动。`el-draggable-table` 组件只是扩展了`el-table` 组件的功能，其他功能一致，所以需要配合`el-table-column`组件使用。

draggable-table/basic

:::

## 指定某列拖动

:::demo `draggable` 组件的所有属性可以通过 `draggable-props` 属性来传递。使用`sort-data`事件来接收排序后的数据。

draggable-table/item

:::

## API

### DraggableTable Props

| 属性名          | 说明                                                                   | 类型   | 默认值 |
| --------------- | ---------------------------------------------------------------------- | ------ | ------ |
| draggable-props | [draggable 组件属性](https://github.com/SortableJS/vue.draggable.next) | object | `{}`   |

### DraggableTable Events

| 事件名    | 说明                 | 类型  |
| --------- | -------------------- | ----- |
| sort-data | 拖动排序后的对象数组 | any[] |

### Table TableColumn

| 属性                                                                                 | 方法                                                                                 | 事件                                                                                 | 插槽                                                                                 |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| [table](https://element-plus.org/zh-CN/component/table.html#table-api)               | [table](https://element-plus.org/zh-CN/component/table.html#table-api)               | [table](https://element-plus.org/zh-CN/component/table.html#table-api)               | [table](https://element-plus.org/zh-CN/component/table.html#table-api)               |
| [table-column](https://element-plus.org/zh-CN/component/table.html#table-column-api) | [table-column](https://element-plus.org/zh-CN/component/table.html#table-column-api) | [table-column](https://element-plus.org/zh-CN/component/table.html#table-column-api) | [table-column](https://element-plus.org/zh-CN/component/table.html#table-column-api) |
