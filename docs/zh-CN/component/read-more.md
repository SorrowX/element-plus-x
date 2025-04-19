---
title: ReadMore 展开阅读更多
lang: zh-CN
---

# ReadMore 展开阅读更多

展开阅读更多内容

## 基础用法

:::demo 使用 `height` 属性来指定容器展示的高度。使用 `v-model` 进行双向绑定，控制容器折叠与展开。

read-more/basic

:::

## 遮罩

:::demo 使用 `overlay` 属性显示遮罩

read-more/text

:::

## 动态内容

:::demo 支持异步数据。`transition` 属性可以控制折叠动画

read-more/async

:::

## 内容过少

:::demo 当内容小于指定的高度时，不会渲染出触发器

read-more/content

:::

## 自定义触发器

:::demo 使用具名 trigger 插槽来自定义触发 UI。

read-more/trigger

:::

## 配合 Form

:::demo 搜索条件过长时可以使用

read-more/form

:::

## API

### Props

| 属性名     | 说明                       | 类型    | 默认值 |
| ---------- | -------------------------- | ------- | ------ |
| height     | 折叠高度                   | string  | 200px  |
| overlay    | 遮罩                       | boolean | false  |
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
