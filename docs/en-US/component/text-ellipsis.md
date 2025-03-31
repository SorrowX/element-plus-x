---
title: TextEllipsis
lang: zh-CN
---

# TextEllipsis 文本省略

对长文本进行省略，支持展开/收起。

## 基础用法

:::demo 默认展示 1 行，超过 1 行显示省略号。

text-ellipsis/basic

:::

## 展开/收起

:::demo 超过行数支持展开/收起。

text-ellipsis/text

:::

## 自定义展示行数

:::demo 通过设置 rows 限制展示行数。

text-ellipsis/rows

:::

## 自定义省略位置

:::demo 通过设置 `position` 控制省略位置。

text-ellipsis/position

:::

## 自定义操作内容

:::demo 通过插槽 `action` 自定义操作内容。

text-ellipsis/action

:::

## API

### 属性

| 属性名       | 说明             | 类型                                | 默认值 |
| ------------ | ---------------- | ----------------------------------- | ------ |
| content      | 需要展示的文本   | string                              | -      |
| expandText   | 展开操作的文案   | string                              | -      |
| collapseText | 收起操作的文案   | string                              | -      |
| dots         | 省略号的文本内容 | string                              | ...    |
| rows         | 展示的行数       | string\|number                      | 1      |
| position     | 省略位置         | ^[enum]`'start'\| 'middle'\| 'end'` | end    |

### Events

| 方法名      | 说明                | 参数                |
| ----------- | ------------------- | ------------------- |
| clickAction | 点击展开/收起时触发 | `event: MouseEvent` |

### Slots

| 插槽名 | 说明         | 参数                    |
| ------ | ------------ | ----------------------- |
| action | 自定义触发器 | `{ expanded: boolean }` |
