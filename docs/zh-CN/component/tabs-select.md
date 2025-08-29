---
title: TabsSelect 标签页选择器
lang: zh-CN
---

# TabsSelect 标签页选择器

多页签选择器，支持分组、列表、树形等结构

## 基础用法

使用`v-model`来绑定选中的值。

`tabs`是一个对象数组，对象含有`title[tab名称]`、`id[tab的id]`、`type[列表展示类型]`、`options[列表数据]`
:::demo

tabs-select/basic

:::

## 多选

使用`multiple`属性来进行多选。其余属性参考`ElSelect`组件属性

:::demo

tabs-select/multiple

:::

## 支持绑定对象和对象数组

使用`value-key`属性来绑定对象和对象数组，和 ElSelect`功能一致

:::demo

tabs-select/basic2

:::

## 自定义 Option

使用`option`插槽来自定义每一项内容,参数值同`ElTree`默认插槽的`node`和`data`

:::demo

tabs-select/slot

:::

## 远程搜索

使用`loading`来控制加载状态,使用`remoteMethod`来加载远程数据

:::demo 注意这个远程搜索和`ElSelect`交互不一致，但是使用姿势类似

tabs-select/select-loading

:::

## 面板

`tabs-select`组件弹窗内容，已被剥离，使用`tabs-select-panel`即可

:::demo 使用姿势和`tabs-select`一致

tabs-select/panel

:::

## 面板-远程搜索

和`tabs-select`组件使用一致

:::demo

tabs-select/panel-loading

:::

## 面板绑定也支持对象和对象数组

:::demo

tabs-select/panel2

:::

## 自定义空内容

:::demo tabs-select 组件同样也支持

tabs-select/empty

:::

## 基于面板

比如可以把面板内容插入到编辑器中

:::demo

tabs-select/editor

:::

## API

### TabsSelect、TabsSelectPanel 属性

TabsSelect 其他相关的 API 属性，请参考 [ElSelect](https://element-plus.org/zh-CN/component/select.html) 即可

| 属性名      | 说明                                              | 类型                                                                       | 默认值  |
| ----------- | ------------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| modelValue  | 双向绑定值                                        | ^[String\|Number\|Array\|Object]`string \| number \| string[] \| number[]` | -       |
| tabs        | 分页配置                                          | ^[Array]`Array<ITabItem>`                                                  | -       |
| tab         | tab 绑定的值(只适用于 tabs-select-panel 组件)     | ^[String\|Number]`string \| number`                                        | -       |
| prefixLabel | label 前缀                                        | ^[String]`string`                                                          | `{x}`   |
| multiple    | 是否多选                                          | ^[Boolean]`boolean`                                                        | -       |
| tabsProps   | el-tabs 组件属性                                  | ^[Object]                                                                  | -       |
| treeProps   | el-tree 组件属性                                  | ^[Boolean]                                                                 | -       |
| border      | 是否含有边框(只适用于 tabs-select-panel 组件)     | ^[Boolean]                                                                 | -       |
| height      | 列表内容的高度                                    | ^[String]                                                                  | `260px` |
| panelStyle  | panelStyle 面板的样式                             | ^[Object]`CSSProperties`                                                   | -       |
| showSearch  | 是否显示搜索框                                    | ^[Boolean]                                                                 | -       |
| valueKey    | 作为 value 唯一标识的键名，绑定值为对象类型时必填 | ^[Boolean]                                                                 | -       |

### Event

| 事件名                  | 说明                                    | 参数                                   |
| ----------------------- | --------------------------------------- | -------------------------------------- |
| change                  | 点击项时的事件                          | `(data: IPanelModelValue) => true`     |
| selected-options-change | 当 v-model 时发生变化时所收集的 options | `(val: ITreeOption[]) => isArray(val)` |

### TabsSelect、TabsSelectPanel Slots

| 事件名 | 说明             | 参数             |
| ------ | ---------------- | ---------------- |
| option | 自定义选项内容   | `{node, data}`   |
| empty  | 数据为空时的内容 | `{hasSearchKey}` |
