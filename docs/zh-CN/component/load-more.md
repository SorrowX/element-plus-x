---
title: LoadMore 加载更多
lang: zh-CN
---

# LoadMore 加载更多

一般配合[Infinite Scroll 无限滚动](https://element-plus.org/zh-CN/component/infinite-scroll.html)或者虚拟列表组件使用

## 基础用法

使用`status`属性来展示不同的文案

:::demo

load-more/basic

:::

## loading 类型

使用`icon-type`属性来指定不同的 icon

:::demo

load-more/type

:::

## 颜色设置

使用`color`属性来指定 icon 的颜色，使用`text-color`属性来指定 text 文本的颜色

:::demo 如果没有`text-color`则使用`color`值来作用于文本

load-more/color

:::

## 大小

使用`icon-size`属性来指定 icon 的大小

:::demo 使用`height`属性来指定容器的高度

load-more/size

:::

## 指定文案

可以指定对应的文案来展示

:::demo

load-more/text

:::

## API

### 属性

弹窗其他相关的 API 属性，请参考 [ElDrawer](https://element-plus.org/zh-CN/component/drawer.html) 即可，剩下是 `DrawerV2` 组件独有的 API 属性

| 属性名       | 说明           | 类型                                  | 默认值                 |
| ------------ | -------------- | ------------------------------------- | ---------------------- |
| status       | 状态           | ^[enum]`more\|loading\|noMore\|error` | -                      |
| icon-type    | icon 类型      | ^[enum]`snow\|circle`                 | -                      |
| color        | icon 颜色      | ^[String]                             | -                      |
| text-color   | 文案 颜色      | ^[String]                             | -                      |
| icon-size    | icon 大小      | ^[Number]                             | 16                     |
| more-text    | 加载前文案     | ^[String]                             | 滚动加载               |
| loading-text | 加载中文案     | ^[String]                             | 加载中...              |
| no-more-text | 全部加载完文案 | ^[String]                             | 没有更多了             |
| error-text   | 加载异常时文案 | ^[String]                             | 请求失败，点击重新加载 |
| height       | 容器的高度     | ^[String]                             | 36                     |

### Event

| 事件名 | 说明     |
| ------ | -------- |
| click  | 点击文案 |
