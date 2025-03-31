---
title: Collapse 折叠内容
lang: zh-CN
---

# 折叠内容

当容器内容过多时，折叠部分内容。

## 基础用法

:::demo 使用 `height` 属性来指定容器展示的高度。使用 `v-model` 进行双向绑定，控制容器折叠与展开。

collapse-content/basic

:::

## 动态内容

:::demo 支持异步数据。`transition` 属性可以控制折叠动画

collapse-content/async

:::

## 内容过少

:::demo 当内容小于指定的高度时，不会渲染出触发器

collapse-content/content

:::

## 自定义触发器

:::demo 使用具名 trigger 插槽来自定义触发 UI。

collapse-content/trigger

:::

## 配合 Form

:::demo 搜索条件过长时可以使用

collapse-content/form

:::

## API

### Props

| 属性名     | 说明                       | 类型    | 默认值 |
| ---------- | -------------------------- | ------- | ------ |
| height     | 折叠高度                   | string  | 200px  |
| modelValue | 双向绑定的值，展开或者折叠 | boolean | true   |
| transition | 是否开发折叠动画           | boolean | true   |
| openText   | 打开文案                   | string  | 展开   |
| closeText  | 关闭文案                   | string  | 收起   |

### Slots

| 插槽名  | 说明         | 类型 |
| ------- | ------------ | ---- |
| trigger | 自定义触发器 | -    |
| default | 内容         | -    |

### Events

| 方法名 | 说明                    | 参数    |
| ------ | ----------------------- | ------- |
| change | modelValue 值发生变化时 | boolean |
