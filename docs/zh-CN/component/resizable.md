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

| 属性名        | 说明             | 类型                                                                     | 默认值 |
| ------------- | ---------------- | ------------------------------------------------------------------------ | ------ |
| trigger-props | 触发按钮属性设置 | ^[Object]`Partial<ButtonProps> & {triggerText?: string}`                 | -      |
| cancel-props  | 取消按钮属性设置 | ^[Object]`Partial<ButtonProps> & {hidden?: boolean;cancelText?: string}` | -      |
| sure-props    | 确定按钮属性设置 | ^[Object]`Partial<ButtonProps> & {hidden?: boolean;sureText?: string}`   | -      |
| on-cancel     | 点击取消时的回调 | ^[Function]`{ close }: { close: () => void }) => void`                   | -      |
| on-sure       | 点击确定时的回调 | ^[Function]`({ close }: { close: () => void }) => void \| Promise<any>`  | -      |

### Slots

| 事件名  | 说明             |
| ------- | ---------------- |
| default | 对话框的默认内容 |
| header  | 对话框标题的内容 |
| footer  | 对话框底部的内容 |
| trigger | 触发器插槽内容   |

### Exposes

| 名称  | 详情     | 类型                    |
| ----- | -------- | ----------------------- |
| open  | 打开弹窗 | ^[Function]`() => void` |
| close | 关闭弹窗 | ^[Function]`() => void` |
