---
title: DropdownV2 下拉菜单
lang: zh-CN
---

# DropdownV2 下拉菜单

与`el-dropdown`区别是`DropdownV2`属于配置化显示且支持多层级且剥离了面板。

## 基础用法

`options`来配置选项
:::demo 使用`change`事件来处理选中的值，默认 hover

dropdown-v2/basic

:::

## 点击触发

设置`trigger`值为 `click` 来改变触发方式
:::demo 使用`width`属性来控制面板的宽度

dropdown-v2/click

:::

## 触发器

默认插槽为触发器
:::demo 使用`tooltip-options`属性来设置第一层级的 tooltip 属性

dropdown-v2/icon

:::

## 自定义 label

使用`label`插槽
:::demo

dropdown-v2/label

:::

## 面板

使用`el-dropdown-v2-panel`组件
:::demo [contextmenu 右键菜单就是基于该面板发开](/zh-CN/component/contextmenu)

dropdown-v2/panel

:::

## API

### DropdownV2 独有属性

| 属性名        | 说明                     | 类型                                                     | 默认值 |
| ------------- | ------------------------ | -------------------------------------------------------- | ------ |
| split-button  | 下拉触发元素呈现为按钮组 | ^[Boolean]                                               | false  |
| trigger-props | 触发器按钮所有属性设置   | ^[Object]`Partial<ButtonProps> & {triggerText?: string}` | -      |

### DropdownV2 、 Panel 属性

| 属性名          | 说明                    | 类型                               | 默认值 |
| --------------- | ----------------------- | ---------------------------------- | ------ |
| options         | 渲染选项                | ^[Object]`DropdownOption[]`        | -      |
| show-timeout    | 弹窗出现前的时间        | ^[Number]                          | 200    |
| hide-timeout    | 弹窗关闭时的时间        | ^[Number]                          | 200    |
| tooltip-options | 第一层级的 tooltip 选项 | ^[Object]`Partial<ElTooltipProps>` | -      |
| width           | 面板的宽度              | ^[Number \| String]                | 140    |
| trigger         | 触发方式                | ^[enum]`hover\|click`              | hover  |

### DropdownOption 属性

| 属性名      | 说明              | 类型                               | 默认值 |
| ----------- | ----------------- | ---------------------------------- | ------ |
| label       | label             | ^[String]                          | -      |
| value       | value             | ^[String \| Number]`DropdownValue` | -      |
| children    | 孩子              | ^[Array]`DropdownOption[]`         | -      |
| disabled    | 是否禁用          | ^[Boolean]                         | -      |
| divided     | 分割线            | ^[Boolean]                         | -      |
| renderLabel | 自定义渲染 render | ^[Function]`RenderLabel`           | -      |

### Slots

| 事件名  | 说明                                                                                         |
| ------- | -------------------------------------------------------------------------------------------- |
| default | 触发器的内容                                                                                 |
| label   | label 的内容(只有 DropdownV2 才有该插槽，panel 组件使用选项 renderLabel 函数返回 VNode 即可) |
