---
title: TableDialog
lang: zh-CN
---

# 表格弹窗

表格弹窗，选 Table 数据

## 基础用法

:::demo 组件必须使用`row-key`属性，用于内部匹配。使用`v-model`进行双向绑定。使用`config.label`来配置右侧需要展示的内容。

table-dialog/basic

:::

## 头部插入

:::demo 将新选择项添加到数组头部

table-dialog/unshift

:::

## 单选

:::demo 使用`type="radio"`进行单选

table-dialog/radio

:::

## 隐藏右侧选中栏

:::demo 使用`hidden-right`进行隐藏。也支持相关事件 `sure` `cancel` `close` `open`，支持`Dialog`组件所有事件

table-dialog/right

:::

## 宽/高设置

:::demo 使用`height`对 table 的高度进行设置，使用`width`属性对整体弹窗的宽度进行设置。

table-dialog/prop

:::

## 自定义触发器

:::demo 使用`trigger`插槽可以自定义触发器

table-dialog/trigger

:::

## 自定义 Label

:::demo 使用`label`插槽可以自定义右侧选中的 UI

table-dialog/label

:::

## 大数据渲染

:::demo 右侧使用虚拟列表渲染，轻松渲染上千或上万条数据。

table-dialog/list

:::

## 确定按钮-异步处理

:::demo 使用`on-sure`属性处理异步接口

table-dialog/sure

:::

## top，footer 插槽

:::demo 使用`top`，`footer`插槽,来满足更多业务

table-dialog/top

:::

## API

### Props

| 属性名                  | 说明                                | 类型                    | 默认值                                                                            |
| ----------------------- | ----------------------------------- | ----------------------- | --------------------------------------------------------------------------------- |
| http-request            | 接口请求                            | function                | -                                                                                 |
| columns                 | el-table-column 组件属性            | `Array<TableColumnCtx>` | `el-table-column 属性+ cellRenderer + headerCellRenderer + reserveRadioSelection` |
| pagination              | el-pagination 组件属性              | `PaginationProps`       | `el-pagination 组件属性 + defaultPageSize + showRecord + showTotal`               |
| config                  | 转换接口入参的 key                  | `Config`                | `{ label: 'label'}`                                                               |
| modelValue              | 双向绑定的值                        | any[]                   | []                                                                                |
| rowKey                  | 行数据的 Key，用来优化 Table 的渲染 | string                  | -                                                                                 |
| title                   | 弹窗标题                            | string                  | -                                                                                 |
| width                   | 弹窗总体宽度                        | string                  | 900                                                                               |
| height                  | 弹窗 table 高度                     | string                  | 500                                                                               |
| type                    | 选择类型(checkbox\|radio)           | string                  | checkbox                                                                          |
| hidden-right            | 是否隐藏右侧选中栏                  | boolean                 | false                                                                             |
| dynamic-size-list-props | 虚拟列表组件属性                    | object                  | `{ estimatedItemSize: 32, itemSize: () => 32, height: 460, width: 295 }`          |
| on-sure                 | 处理点击 sure 按钮                  | function                | `{any[], { loading, closeDialog }}`                                               |
|                         |
| sure-text               | 确定文案                            | string                  | `确定`                                                                            |
|                         |
| cancel-text             | 取消文案                            | string                  | `取消`                                                                            |
|                         |
| selected-field-title    | 已选字段文案                        | string                  | `已选字段`                                                                        |
|                         |

### Slots

| 插槽名  | 说明                       | 类型                                 |
| ------- | -------------------------- | ------------------------------------ |
| header  | 往 table-page 顶部插入内容 | -                                    |
| trigger | 触发器插槽                 | -                                    |
| label   | 自定义右侧选中内容         | `{ item, index, close: () => void }` |
| top     | 顶部内容                   | -                                    |
| footer  | 底部内容                   | -                                    |

### Methods

| 方法名   | 说明                    | 参数                                              |
| -------- | ----------------------- | ------------------------------------------------- |
| request  | 调用接口重新请求数据    | {pageSize, currentPage}, 具体字段根据 config 配置 |
| getTable | 获取内置 table 组件实例 | -                                                 |

### Event（支持 Dialog 组件所有事件）

| 事件名 | 说明           | 参数  |
| ------ | -------------- | ----- |
| sure   | 点击确定时出发 | row[] |
| cancel | 点击取消时出发 | -     |
