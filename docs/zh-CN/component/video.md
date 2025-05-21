---
title: Video 视频
lang: zh-CN
---

# Video 视频

播放视频

## 基础用法

使用`poster`设置封面，使用`src`设置视频播放地址

:::demo 视频尺寸建议使用 max-width 或者 width、height 属性

video/basic

:::

## 自定义 UI

使用`play-icon`插槽设置播放按钮

:::demo 也可以使用`poster` `duration` `default`插槽 分别设置 `封面` `时长` `video回退内容`

video/slot

:::

## 只读态

使用`readonly`属性用于只展示封面不渲染`video`,用户点击后使用全局一个`video`来进行播放

:::demo 关于尺寸问题，可以根据后端返回的尺寸大小，判断图片是否是横屏、竖屏、方形，然后编写对应的 css 类名，赋给`el-video`组件，这样可以做到视觉统一的效果

video/list

:::

## API

### 属性

| 属性名         | 说明                          | 类型                                       | 默认值 |
| -------------- | ----------------------------- | ------------------------------------------ | ------ |
| src            | 视频地址                      | ^[String]                                  | -      |
| poster         | 视频封面                      | ^[String]                                  | -      |
| duration       | 时长,如果是数字内部会计算转换 | ^[String\|Number]                          | -      |
| readonly       | 只读态                        | ^[Boolean]                                 | false  |
| on-click       | 点击封面的回调                | ^[Function]`(event: PointerEvent) => void` | -      |
| on-poster-load | 封面加载成功的回调            | ^[Function]`(event: Event) => void`        | -      |

### Slots

| 事件名    | 说明               |
| --------- | ------------------ |
| default   | video 标签的子内容 |
| poster    | 封面内容           |
| duration  | 时长内容           |
| play-icon | 播放按钮内容       |

### Exposes

| 名称  | 详情       | 类型                        |
| ----- | ---------- | --------------------------- |
| video | video 元素 | ^[Object]`HTMLVideoElement` |
