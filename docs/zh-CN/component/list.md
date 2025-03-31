---
title: List 列表
lang: zh-CN
---

# List 列表

适用于加载更多数据，支持上下滚动加载数据

## 基本使用

使用`load`来加载数据，使用`finished`属性来终止加载

:::demo 使用`load`函数需要返回`promise`实例，且`promise`的状态决定是`loading`还是`error`，使用`finished`属性来决定已全部加载完毕的状态。

list/basic

:::

## 向上滚动加载

使用`pre-load`来加载顶部数据

:::demo

list/before

:::

## 原生滚动条

使用`native-scrollbar`属性切换原生滚动条

:::demo

list/native

:::

## API

### 属性

| 属性名                   | 说明                                       | 类型             | 默认值                 |
| ------------------------ | ------------------------------------------ | ---------------- | ---------------------- |
| list                     | 列表项                                     | ^[Array]`any[]>` | -                      |
| native-scrollbar         | 是否使用原生滚动条                         | `Boolean`        | false                  |
| infinite-scroll-delay    | 节流时延，单位为 ms                        | `Number`         | 16                     |
| infinite-scroll-distance | 触发加载的距离阈值，单位为 px              | `Number`         | 20                     |
| load                     | 内容到达底部时触发加载的函数               | `Function`       | -                      |
| pre-load                 | 内容到达顶部时触发加载的函数               | `Function`       | -                      |
| finished                 | 配合 load 使用，当数据加载完毕时，可以设置 | `Boolean`        | false                  |
| loading-text             | 加载时的文案                               | `String`         | 加载中...              |
| error-text               | 加载异常的文案                             | `String`         | 请求失败，点击重新加载 |
| no-more-text             | 加载完的文案                               | `String`         | 没有更多了             |

### Events

| 事件名 | 说明           | 类型                            |
| ------ | -------------- | ------------------------------- |
| scroll | 容器滚动时触发 | ^[Function]`(e: Event) => void` |

### Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 列表项内容 |

### Exposes

| 名称           | 详情       | 类型                           |
| -------------- | ---------- | ------------------------------ |
| scrollToBottom | 滚动到底部 | ^[Function]`() => void`        |
| target         | 滚动容器   | ^[Object]`Ref<HTMLDivElement>` |
