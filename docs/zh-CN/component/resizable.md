---
title: Resizable 伸缩框
lang: zh-CN
---

# Resizable 伸缩框

拖拽元素，改变其大小，适用于弹窗拉伸

## 基础用法

使用`w` `h`属性来初始化组件的宽高，使用`minw` `minh`属性来设置组件可以缩放的最小值

:::demo 组件默认可以拖拽，使用`is-draggable`属性来开启或者关闭拖拽，使用`is-resizable`属性来开启或者关闭缩放

resizable/basic

:::

## 自定义拖拽元素

使用`is-custom-draggable` 属性来屏蔽内部拖动函数的执行，使用插槽抛出的`handleTargetDown`函数绑定到需要拖动的元素即可

:::demo

resizable/drag-header

:::

## 控制伸缩方向

使用`sticks` 属性来控制伸缩方向，共有 8 个值。`tl`(上左)、`tm`(上)、`tr`(上右)、`mr`(右)、`br`(下右)、`bm`(下)、`bl`(下左)、`ml`(左)、

:::demo 默认是以上全部，可以按需选择对应的方向

resizable/sticks

:::

## 自定义伸缩器

`sticks` 属性的 8 个值，分别对应这 8 个插槽，可以使用对应的插槽来进行自定义 UI

:::demo

resizable/sticks-slot

:::

## 根据父元素限制元素宽高

使用`parent-limitation` 属性后，组件会找到父元素的宽高限制组件的宽高

:::demo

resizable/parent

:::

## 相对与窗口

使用`parent-w` `parent-h` 属性后，则不使用父元素的宽高。

:::demo 也可以使用`x` `y` 属性定义组件的初始位置，默认为`0` `0`

resizable/window

:::

## API

### 属性

| 属性名              | 说明                           | 类型               | 默认值 |
| ------------------- | ------------------------------ | ------------------ | ------ |
| is-draggable        | 组件是否应可拖动               | ^[Boolean]         | true   |
| is-custom-draggable | 是否自定义组件局部元素可拖动   | ^[Boolean]         | false  |
| is-resizable        | 组件是否应调整大小             | ^[Boolean]         | true   |
| parent-limitation   | 将组件更改的范围限制为其父大小 | ^[Boolean]         | false  |
| parent-w            | 定义父元素的初始宽度           | ^[Number]          | 0      |
| parent-h            | 定义父元素的初始高度           | ^[Number]          | 0      |
| w                   | 定义组件的初始宽度             | ^[Number]          | 200    |
| h                   | 定义组件的初始高度             | ^[Number]          | 200    |
| minw                | 定义组件的最小宽度             | ^[Number]          | 50     |
| minh                | 定义组件的最小高度             | ^[Number]          | 50     |
| x                   | 定义组件的初始 X 位置          | ^[Number]          | 0      |
| y                   | 定义组件的初始 Y 位置          | ^[Number]          | 0      |
| z                   | 定义组件的 zindex(层级)        | ^[Number]          | auto   |
| sticks              | 定义句柄数组以限制元素大小调整 | ^[Array]`IStick[]` | -      |

### Slots

| 事件名  | 说明          |
| ------- | ------------- |
| default | 默认内容      |
| tl      | 上左-句柄内容 |
| tm      | 上-句柄内容   |
| tr      | 上右-句柄内容 |
| mr      | 右-句柄内容   |
| br      | 下右-句柄内容 |
| bm      | 下-句柄内容   |
| bl      | 下左-句柄内容 |
| ml      | 左-句柄内容   |

### Event

| 事件名       | 说明     | 参数                             |
| ------------ | -------- | -------------------------------- |
| drag-start   | 拖拽开始 | (evt: PointerEvent, rect: IRect) |
| drag         | 拖拽中   | (evt: PointerEvent, rect: IRect) |
| drag-end     | 拖拽结束 | (evt: PointerEvent, rect: IRect) |
| resize-start | 伸缩开始 | (evt: PointerEvent, rect: IRect) |
| resize       | 伸缩中   | (evt: PointerEvent, rect: IRect) |
| resize-end   | 伸缩结束 | (evt: PointerEvent, rect: IRect) |
