---
title: Flex 弹性布局
lang: zh-CN
---

# Flex 弹性布局

## 基础用法

通过设置 `vertical` 属性进行垂直布局

:::demo

flex/basic

:::

## 对齐方式

设置对齐方式。

:::demo 根据 `justify` 设置主轴对齐方式，根据 `align` 设置交叉轴对齐方式

flex/align

:::

## 设置间隙

使用 `gap` 设置元素之间的间距，预设了 `small、default、large` 三种尺寸，也可以自定义间距。

:::demo

flex/gap

:::

## 自动换行

使用 `wrap` 设置元素如何换行

:::demo 本质则是`flex-wrap`属性

flex/wrap

:::

## 组合使用

嵌套使用，可以实现更复杂的布局。

:::demo

flex/combination

:::

## API

### Props

| 属性      | 说明                                                   | 类型                                                                                     | 默认值  |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------- |
| vertical  | flex 主轴的方向是否垂直，使用 `flex-direction: column` | boolean                                                                                  | `false` |
| wrap      | 设置元素单行显示还是多行显示                           | 参考 [flex-wrap](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap)             | -       |
| justify   | 设置元素在主轴方向上的对齐方式                         | 参考 [justify-content](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) | -       |
| align     | 设置元素在交叉轴方向上的对齐方式                       | 参考 [align-items](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items)         | -       |
| flex      | flex CSS 简写属性                                      | 参考 [flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)                       | -       |
| gap       | 设置网格之间的间隙                                     | `small` \| `default` \| `large` \| string \| number                                      | -       |
| component | 自定义元素类型                                         | Component                                                                                | `div`   |
