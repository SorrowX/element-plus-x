---
title: TablePage
lang: zh-CN
---

# 表格页

基于 Table 组件和分页组件编写的表格页组件

## 基础用法

:::demo 使用 样式 `height` 给容器指定高度。使用`columns`指定`table-column`渲染，`columns`属性值包含`table-column`组件的所有属性。使用 `http-request` 方法请求后台数据

table-page/basic

:::

## 自定义头部/单元格渲染

:::demo 使用 `headerCellRenderer` 和 `cellRenderer` 属性分别渲染头部和单元格内容，可使用`jsx语法`

table-page/render

:::

## 配置对象

:::demo 使用 `config` 属性来适配后端入参的 key。默认`current`和`size`

table-page/config

:::

## 序号/复选

:::demo 使用 `table-column` 组件原生属性即可

table-page/type

:::

## 单选

:::demo `column`选项可以配置`type: radio`来开启单选。使用`radio-selection-change`事件来监听当前选择的 row。也可以使用`getRadioSelectionRow` `toggleRadioRowSelection` `clearRadioSelection` 方法分别获取行、切换行、清空选择的行。

table-page/radio

:::

## 大屏 Table 高度自动固定

:::tip
`boundary-value` 属性理论上你是不需要手动设置的，在大屏和小屏使用该组件时，其内部会根据其默认值，自行决定 table 是否固定。解决了小屏会变成流体布局，大屏会自定固定 table 的问题。
:::

:::demo 使用`boundary-value`属性(默认 680)，可以指定当 table 容器大于这个边界值时，则固定 table。使用 `pagination` 属性的 `defaultPageSize` 可以指定默认加载页码尺寸。

table-page/boundary-value

:::

## 空值显示

:::demo 支持`el-empty`组件所有属性、事件及插槽。

table-page/empty

:::

## 自定义头

:::demo 使用 `header` 插槽可以自定义头部内容。调用组件`request`方法可以重新请求接口更新数据，`request`方法调用本质就是调用`http-request`，这么做是为了同步组件内部状态值及同步用户的入参。

table-page/header

:::

## 自定义 table

:::demo 使用 `table` 插槽替换 table 组件，当成普通列表页展示

table-page/slots

:::

## API

### Props

| 属性名          | 说明                                            | 类型                    | 默认值                                                                            |
| --------------- | ----------------------------------------------- | ----------------------- | --------------------------------------------------------------------------------- |
| http-request    | 接口请求                                        | function                | -                                                                                 |
| columns         | el-table-column 组件属性                        | `Array<TableColumnCtx>` | `el-table-column 属性+ cellRenderer + headerCellRenderer + reserveRadioSelection` |
| pagination      | el-pagination 组件属性                          | `PaginationProps`       | `el-pagination 组件属性 + defaultPageSize + showRecord + showTotal`               |
| config          | 转换接口入参的 key                              | `Config`                | `{ currentPage: 'pageNo', pageSize: 'pageSize' }`                                 |
| boundary-value  | table 容器高度的边界值,大于该边界值则固定 table | number                  | 680                                                                               |
| first-invoke    | http-request 是否在组件初始化时调用             | number                  | true                                                                              |
| show-pagination | 是否显示分页组件                                | boolean                 | true                                                                              |

### Slots

| 插槽名 | 说明                       | 类型 |
| ------ | -------------------------- | ---- |
| header | 往 table-page 顶部插入内容 | -    |

### Methods

| 方法名                  | 说明                             | 参数                                              |
| ----------------------- | -------------------------------- | ------------------------------------------------- |
| request                 | 调用接口重新请求数据             | {pageSize, currentPage}, 具体字段根据 config 配置 |
| getTable                | 获取内置 table 组件实例          | -                                                 |
| getState                | 获取内置 响应式状态              | -                                                 |
| clearRadioSelection     | table 实例方法-清空单选状态      | -                                                 |
| getRadioSelectionRow    | table 实例方法-获取单选 row      | -                                                 |
| toggleRadioRowSelection | table 实例方法-切换 row 是否单选 | (row: any, selected: boolean)                     |
