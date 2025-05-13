---
title: Bubble
lang: zh-CN
---

# Bubble 对话气泡

用于聊天的气泡组件。

## 基础用法

:::demo 三种渲染方式，使用 `content` 属性将文字渲染出,也可以使用`default`和`content`插槽来渲染，

bubble/basic

:::

## 聊天

:::demo 如果不搭配打字效果，建议使用插槽形式来渲染

bubble/arrow

:::

## 位置和头像

通过 `avatar` 设置自定义头像，通过 `placement` 设置位置，提供了 start、end 两个选项。

:::demo `avatar` 可以是[el-avatar](https://element-plus.org/zh-CN/component/avatar.html)组件任意属性组成的对象或布尔，或者也可以使用`avatar`插槽来自定义头像

bubble/avatar-and-placement

:::

## 头和尾

通过 `header` 和 `footer` 属性设置气泡的头部和底部。可以是`字符串`或者`VNode`
:::demo 也可以使用 `header` 和 `footer` 插槽自定义渲染

bubble/header-and-footer

:::

## 加载中

通过 `loading` 属性控制加载状态。
:::demo

bubble/loading

:::

## 打字效果

通过设置 `typing` 属性，开启打字效果。更新 `content` 如果是之前的子集，则会继续输出，否则会重新输出。
:::demo

bubble/typing

:::

## 自定义渲染

配合 `markdown-it` 实现自定义渲染内容。
:::demo

bubble/markdown

:::

## 变体

通过 `variant` 属性设置气泡的样式变体。
:::demo 可以使用 `content` 插槽来自定义内容

bubble/variant

:::

## 形状

通过 `shape` 属性设置气泡的形状。
:::demo

bubble/shape

:::

## 气泡列表

预设样式的气泡列表，支持自动滚动。使用 `roles` 设置气泡默认属性。
:::demo `roles`会自动合并到`items`每一项中

bubble/list

:::

## 语义化自定义

示例通过语义化以及加载定制，来调整气泡效果。
:::demo 使用`loadingRender`函数来自定义`loading`内容，也支持`loading 插槽`来自定义

bubble/bubble-custom

:::

## 自定义列表内容

自定义气泡列表内容，这对于个性化定制场景非常有用。
:::demo 当使用`messageRender` 函数自定义渲染内容时，会把`content`属性值作为参数传入

bubble/list-custom

:::

## API

### Bubble 属性

| 属性名             | 说明                                                         | 类型                                                     | 默认值 |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------- | ------ |
| variant            | 气泡样式变体                                                 | ^[enum]`'filled'\| 'borderless'\| 'outlined'\| 'shadow'` | filled |
| avatar             | 头像展示                                                     | `VNode \| string \| boolean`                             | -      |
| loading            | 加载中                                                       | `boolean`                                                | false  |
| typing             | 打字配置                                                     | `boolean \| TypingOption`                                | -      |
| placement          | 位置                                                         | ^[enum]`'start'\| 'end'`                                 | -      |
| message-render     | 自定义内容渲染                                               | `(content: any) => VNode \| string`                      | -      |
| shape              | 形状                                                         | ^[enum]`'round'\| 'corner' \| 'arrow'`                   | -      |
| content            | 内容                                                         | `string`                                                 | -      |
| header             | 头部内容                                                     | `string \| VNode`                                        | -      |
| footer             | 底部内容                                                     | `string \| VNode`                                        | -      |
| loading-render     | 自定义渲染 loading                                           | `() => VNode`                                            | -      |
| on-typing-complete | 打字效果完成时的回调，如果没有设置 typing 将在渲染时立刻触发 | `() => void`                                             | -      |
| header-class       | 头部内容 class 名                                            | `string`                                                 | -      |
| header-style       | 头部内容 style                                               | `string \| object \| array`                              | -      |
| content-class      | 内容 class 名                                                | `string`                                                 | -      |
| content-style      | 内容 style                                                   | `string \| object \| array`                              | -      |
| footer-class       | 底部内容 class 名                                            | `string`                                                 | -      |
| footer-style       | 底部内容 style                                               | `string \| object \| array`                              | -      |

### Bubble Slots

| 插槽名  | 说明           | 类型 |
| ------- | -------------- | ---- |
| avatar  | 自定义头像     | -    |
| header  | 自定义内容头部 | -    |
| footer  | 自定义内容底部 | -    |
| content | 自定义内容     | -    |
| loading | 自定义 loading | -    |

### BubbleList 属性

| 属性名                         | 说明                                                 | 类型                              | 默认值 |
| ------------------------------ | ---------------------------------------------------- | --------------------------------- | ------ |
| auto-scroll                    | 列表是否自动滚动                                     | `boolean`                         | true   |
| items                          | 列表项数据                                           | `BubbleDataType[]`                | -      |
| roles                          | 设置气泡默认属性，`items` 中的 `role` 会进行自动对应 | `RolesType \| Function`           | -      |
| on-last-bubble-typing-complete | 最后一项数据打字完成后的回调                         | `(key: string \| number) => void` | -      |
