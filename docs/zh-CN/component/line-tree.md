---
title: LineTree
lang: zh-CN
---

# LineTree 带线的树

使 ElTree 组件带有线的功能

## 基础用法

默认使用姿势与`ElTree`一致。
:::demo

line-tree/basic

:::

## 线的弧度

使用`line-radius`属性来设置线的弧度。使用`line-color`设置线的颜色。
:::demo 使用`icon`组件和`icon-props`来快速设置折叠器的 icon 及属性

line-tree/radius

:::

## 自定义折叠器

使用`collapse`插槽来设置自定义折叠器。当使用自定义折叠器插槽时，修改 ui 尺寸后，必须设置`collapse-width`的值，该值为`自定义折叠器UI`的宽度。
:::demo 由于线的位置是基于`自定义折叠器UI`的宽度动态通过 css 计算的，所以需要设置`collapse-width`值，当然你也可以手动修改 css 变量也行，只不过没有该属性方便。

line-tree/collapse

:::

## 自定义节点内容

使用`默认插槽`可以自定义节点内容，由于业务的复杂性，节点的高度可能不是固定的，比如这面这个案列
:::demo 当自定义节点的内容也需要连线时，可以使用`show-content-line`属性开启

line-tree/slot

:::

## 原有功能

因为`ElLineTree`本是通过`css`修改而来，所以`ElTree`的功能都保留
:::demo

line-tree/load

:::

## API

### 属性

其他相关的 API 属性，请参考 [ElTree](https://element-plus.org/zh-CN/component/tree.html) 即可，剩下是 `LineTree` 组件独有的 API 属性

| 属性名               | 说明                                                                                          | 类型       | 默认值 |
| -------------------- | --------------------------------------------------------------------------------------------- | ---------- | ------ |
| line-radius          | 线的弧度                                                                                      | ^[String]  | 0px    |
| line-color           | 线的颜色                                                                                      | ^[String]  | -      |
| collapse-width       | 当自定义 collapse 内容时，需要设置 collapse 的宽度值，为了调整连线的位置                      | ^[String]  | 15px   |
| show-content-line    | 自定义 content 后，子内容的高度可能变化，添加一条线会更好                                     | ^[Boolean] | false  |
| icon-props           | 自定义图标的属性                                                                              | ^[Object]  | -      |
| expand-on-click-icon | 是否在点击节点前的 icon 时展开或者收缩节点， 默认值为 true,可以搭配`expand-on-click-node`使用 | ^[Boolean] | true   |

### Slots

| 事件名   | 说明           |
| -------- | -------------- |
| collapse | 自定义折叠器   |
| default  | 自定义节点内容 |
