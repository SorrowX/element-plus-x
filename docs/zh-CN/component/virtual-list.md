---
title: VirtualList 虚拟列表
lang: zh-CN
---

# VirtualList 虚拟列表

虚拟列表，基于 [VueUse useVirtualList](https://vueuse.org/core/useVirtualList/) 开发。

解决[UseVirtualList](https://vueuse.org/core/useVirtualList/#component-usage)组件使用动态列表不方便的问题(用户无法提前感知要渲染内容的宽高，所以不好传入到`itemHeight`或`itemWidth`属性中)。

自`v1.0.8`开始该组件滚动条支持`ElScrollbar`和原生滚动条

## 动态列表

组件指定高度，子内容超出则可滚动。

:::demo 由于元素高度不确定，默认插槽内容在渲染之后或尺寸变化后会重新计算其真实高度进行修正，所以需使用`item-size`属性来对内容进行一个预估的高度(垂直)或宽度(水平)。

virtual-list/basic

:::

## 固定列表

理论上固定列表也是动态列表中的一种，只是其高度(宽度)是固定的，所以使用上述的使用姿势也没任何问题。

如果我们知道布局的高度(宽度)是固定的，建议使用固定列表，因为固定列表虚拟滚动，有更好的性能表现，且滚动条位置显示也是精准的。

:::demo 使用`item-fixed`来开启固定列表，`item-size`是每一项的总高度或总宽度(盒模型宽高+padding+border+margin),所以默认插槽内容如含有`margin-bottom`属性，则需在`size`中减掉，没有则不用减

virtual-list/fixed

:::

## 无限虚拟滚动

有时候可能希望虚拟列表也能作为普通列表来加载更多的数据项。

:::demo 使用`after`插槽来后置一些内容。使用`infinite-scroll`函数来加载更多

virtual-list/after

:::

## load 加载

为了使上面的使用姿势变得更加精简，可以使用`load`函数来加载更多数据，这样只需关心业务逻辑即可，不用操心`loading` `error` `finished` 的状态。

:::demo 使用`load`函数需要返回`promise`实例，且`promise`的状态决定是`loading`还是`error`，使用`finished`属性来决定已全部加载完毕的状态。

virtual-list/load

:::

## API

### 属性

| 属性名                   | 说明                                                                                                           | 类型                          | 默认值                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------- |
| list                     | 列表项                                                                                                         | ^[Array]`any[]>`              | -                      |
| item-fixed               | 是否为固定列表                                                                                                 | `Boolean`                     | false                  |
| item-size                | 当为固定列表时，这个值表示默认插槽 UI 的总高度或共宽度；当为动态列表时，表示默认插槽 UI 总高度或共宽度的预估值 | `Number`                      | -                      |
| overscan                 | 预渲染 DOM 节点的数量。如果滚动速度非常快，可以防止项目之间出现空白。                                          | `Number`                      | 10                     |
| direction                | 水平还是垂直滚动                                                                                               | ^[Enum]`vertical\|horizontal` | vertical               |
| native-scrollbar         | 是否使用原生滚动条                                                                                             | `Boolean`                     | false                  |
| infinite-scroll          | 触底时触发的函数                                                                                               | `Function`                    | -                      |
| infinite-scroll-disabled | 禁用后触底时也不触发 infinite-scroll                                                                           | `Boolean`                     | false                  |
| infinite-scroll-delay    | 节流时延，单位为 ms                                                                                            | `Number`                      | 16                     |
| infinite-scroll-distance | 触发加载的距离阈值，单位为 px                                                                                  | `Number`                      | 20                     |
| load                     | 内容到达底部时触发加载的函数                                                                                   | `Function`                    | -                      |
| finished                 | 配合 load 使用，当数据加载完毕时，可以设置                                                                     | `Boolean`                     | false                  |
| loading-text             | 加载时的文案                                                                                                   | `String`                      | 加载中...              |
| error-text               | 加载异常的文案                                                                                                 | `String`                      | 请求失败，点击重新加载 |
| no-more-text             | 加载完的文案                                                                                                   | `String`                      | 没有更多了             |

### Events

| 事件名 | 说明           | 类型                            |
| ------ | -------------- | ------------------------------- |
| scroll | 容器滚动时触发 | ^[Function]`(e: Event) => void` |

### Slots

| 插槽名   | 说明           |
| -------- | -------------- |
| before   | 列表前置内容   |
| after    | 列表后置内容   |
| loading  | 加载时的内容   |
| error    | 加载异常的内容 |
| finished | 加载完的内容   |

### Exposes

| 名称     | 详情   | 类型                                 |
| -------- | ------ | ------------------------------------ |
| scrollTo | 滚动到 | ^[Function]`(index: number) => void` |
