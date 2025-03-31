---
title: Editable
lang: zh-CN
---

# Editable 可编辑

将 Form 组件包裹，切换阅读状态或者编辑状态

## 基础用法

:::demo 使用 `model-value` 值同步只读状态，默认双击切换为编辑

editable/basic

:::

## 单击

:::demo 使用`trigger` 属性，可以使出发条件改为 双击 单击 icon

editable/click

:::

## Icon

:::demo 也可以使用`icon`来触发，且可以自定 icon

editable/icon

:::

## 自定义 Icon

:::demo 可以自定义 Icon,也可以配合任意 Form 控件使用,使用`default-edit-state`属性可以控制组件默认是编辑状态还是阅读状态

editable/custom

:::

## API

### 属性 Props

| 属性名           | 说明                            | 类型                                | 默认值   |
| ---------------- | ------------------------------- | ----------------------------------- | -------- |
| modelValue       | 阅读态展示的值                  | null                                | -        |
| trigger          | 出发方式                        | string（dblclick \| click \| icon） | dblclick |
| icon             | icon 模式下可以自定义 icon 图标 | icon 组件                           | Edit     |
| defaultEditState | 默认是只读还是编辑状态          | boolean                             | false    |

### 事件 Events

| 事件名 | 说明           | 类型    |
| ------ | -------------- | ------- |
| change | 切换状态时触发 | boolean |

### 插槽 Slots

| 插槽名  | 说明             | 类型 |
| ------- | ---------------- | ---- |
| default | 一般是 Form 组件 | -    |
| icon    | 自定义 icon      | -    |
