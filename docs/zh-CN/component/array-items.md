---
title: ArrayItems
lang: zh-CN
---

# ArrayItems 自增列表

表单自增，删除，上移，下移，拖拽排序。

## 基础用法

使用`array-items`组件的`default`插槽来动态渲染每一行
:::demo 使用`append`插槽来追加一些内容。

array-items/basic

:::

## 对象数组

使用 from 表单组件的 `v-model` 绑定对应的 `prop`
:::demo

array-items/object-array

:::

## 校验

使用 `form-item` 组件的 rules 属性即可，更多自定义校验，请参考官方文档
:::demo

array-items/validate

:::

## 禁用

使用 `disable` 属性可禁用全部
:::demo

array-items/disabled

:::

## Index

`Index` 序号
:::demo 可以使用`formatter` 来格式化展示内容

array-items/index

:::

## Addition

`Addition` 组件本质就是`el-button`组件的扩展，你可以当作 [el-button](https://element-plus.org/zh-CN/component/button.html) 组件来使用。
:::demo `title` `method` `defaultValue` 属性是 `Addition` 组件的扩展属性

array-items/addition

:::

## Remove

`Remove` 组件本质就是`el-button`组件的扩展，你可以当作 [el-button](https://element-plus.org/zh-CN/component/button.html) 组件来使用。
:::demo `title` 属性是 `Addition` 组件的扩展属性

array-items/remove

:::

## MoveDown/MoveUp

`MoveDown` 和 `MoveUp` 组件本质就是`el-button`组件的扩展，你可以当作 [el-button](https://element-plus.org/zh-CN/component/button.html) 组件来使用。
:::demo `title` 属性是 `MoveDown` 和 `MoveUp` 组件的扩展属性

array-items/move

:::

## SortHandle

`SortHandle` 组件本质就是`el-button`组件的扩展，你可以当作 [el-button](https://element-plus.org/zh-CN/component/button.html) 组件来使用。
:::demo

array-items/sort

:::

## API

### ArrayItems Slots

| 插槽名   | 说明                     | 参数                                                      |
| -------- | ------------------------ | --------------------------------------------------------- |
| default  | 动态循环遍历的内容       | `{ field:FormItemContext, $index: number, $record: any }` |
| append   | 前置插槽                 | `{ field:FormItemContext }`                               |
| addition | 比如放置一些添加按钮插槽 | `{ field:FormItemContext }`                               |
| append   | 后置插槽                 | `{ field:FormItemContext }`                               |

### Index

| 属性名    | 说明         | 类型                                  | 默认值 |
| --------- | ------------ | ------------------------------------- | ------ |
| index     | 索引值       | number                                | -      |
| formatter | 格式化的内容 | formatter?: (index: number) => string | -      |

### Addition

| 属性名       | 说明                                                                      | 类型                        | 默认值 |
| ------------ | ------------------------------------------------------------------------- | --------------------------- | ------ |
| title        | 按钮内容                                                                  | string                      | -      |
| method       | 数组前置插入还是后置插入                                                  | ^[enum]`'push'\| 'unshift'` | push   |
| defaultValue | 往数组里面插入的值                                                        | any                         | -      |
| `el-button`  | [ 属性，事件，插槽](https://element-plus.org/zh-CN/component/button.html) | -                           | -      |

### Remove

| 属性名      | 说明                                                                      | 类型   | 默认值 |
| ----------- | ------------------------------------------------------------------------- | ------ | ------ |
| title       | 按钮内容                                                                  | string | -      |
| `el-button` | [ 属性，事件，插槽](https://element-plus.org/zh-CN/component/button.html) | -      | -      |

### MoveDown/MoveUp

| 属性名      | 说明                                                                      | 类型   | 默认值 |
| ----------- | ------------------------------------------------------------------------- | ------ | ------ |
| title       | 按钮内容                                                                  | string | -      |
| `el-button` | [ 属性，事件，插槽](https://element-plus.org/zh-CN/component/button.html) | -      | -      |

### SortHandle

| 属性名      | 说明                                                                      | 类型 | 默认值 |
| ----------- | ------------------------------------------------------------------------- | ---- | ------ |
| `el-button` | [ 属性，事件，插槽](https://element-plus.org/zh-CN/component/button.html) | -    | -      |
