---
title: SelectV3 选择器
lang: zh-CN
---

# SelectV3 选择器

选择器，基于虚拟选择器开发的业务选择器，当文本超出时，出现 tooltip。

## 基础用法

使用 `options`传入数据

:::demo

select-v3/basic

:::

## 个微、企微

`options` 对象中加入 `type` 属性即可

:::demo type 为 1 是个微, type 为 2 是企微

select-v3/type

:::

## Icon

传入 `icon`组件来显示不同的 icon

:::demo `icon`组件的优先级大于 type 字段

select-v3/icon

:::

## 自定义 Tooltip

使用`text-ellipsis-options` 属性来设置`text-ellipsis`组件属性

:::demo

select-v3/options

:::

## API

### 属性

其他相关的 API 属性，请参考[Virtualized Select 虚拟化选择器](https://element-plus.org/zh-CN/component/select-v2.html)

| 属性名                | 说明                   | 类型                   | 默认值 |
| --------------------- | ---------------------- | ---------------------- | ------ |
| options               | 选项列表               | ^[Array]`OptionType[]` | -      |
| text-ellipsis-options | text-ellipsis 组件属性 | ^[Object]              | -      |
| icon                  | icon 组件              | ^[Object]              | -      |
| icon-options          | icon 组件属性          | ^[Object]              | -      |
