---
title: ArrayTable
lang: zh-CN
---

# ArrayTable 自增表格

表格自增，删除，上移，下移

## 基础用法

`ArrayTable`和`ArrayTableColumn`本身是由`Table`和`TableColumn`组件扩展而来,所以属性 事件 插槽 请参考对应的 api。
:::demo

array-table/basic

:::

## 分页

使用 `pagination` 属性开启分页
:::demo

array-table/pagination

:::

## 校验

使用 `form-item` 组件的 rules 属性即可，更多自定义校验，请参考官方文档
:::demo

array-table/validate

:::

## API

### ArrayTable 属性

| 属性名     | 说明                                                                            | 类型   | 默认值 |
| ---------- | ------------------------------------------------------------------------------- | ------ | ------ |
| pagination | [pagination 组件属性](https://element-plus.org/zh-CN/component/pagination.html) | object | -      |
| table      | [table 组件属性](https://element-plus.org/zh-CN/component/table.html)           | -      | -      |

### ArrayTableColumn 属性

| 属性名       | 说明                                                                         | 类型 | 默认值 |
| ------------ | ---------------------------------------------------------------------------- | ---- | ------ |
| table-column | [table-column 组件属性](https://element-plus.org/zh-CN/component/table.html) | -    | -      |

### Addition, Remove, MoveDown, MoveUp

| 属性名                      | 说明                                                          | 类型 | 默认值 |
| --------------------------- | ------------------------------------------------------------- | ---- | ------ |
| 组件的 `属性` `事件` `插槽` | [参考 ArrayItems 自增列表](/zh-CN/component/array-items.html) | -    | -      |

### ArrayTable 插槽

| 插槽名   | 说明                                                                                                   | 参数                       |
| -------- | ------------------------------------------------------------------------------------------------------ | -------------------------- |
| prepend  | table 前置插槽                                                                                         | `{field:FormItemContext }` |
| addition | table 后置插槽,比如放添加按钮等操作，或者使用 table 自带的 append 插槽，但是参数和 addition 插槽不一样 | `{field:FormItemContext }` |
