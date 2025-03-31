---
title: PreviewFile 文件预览
lang: zh-CN
---

# PreviewFile 文件预览

适用于`ElUpload`组件处于阅读状态时展示

## 基础用法

使用 `fileList`传入列表，参数类型为`UploadUserFile`

:::demo

preview-file/basic

:::

## 自定义 UI

使用默认插槽自定义渲染模版

:::demo `meta`对象含有如下属性 `{ name, fileName, fileNameSuffix, size, type, icon, iconColor, iconSize }`

preview-file/slot

:::

## 图片预览

使用`previewImage` 方法可以预览图片

:::demo

preview-file/image

:::

## 文件下载

使用`download` 方法下载文件

:::demo

preview-file/download

:::

## API

### 属性

| 属性名   | 说明     | 类型                       | 默认值 |
| -------- | -------- | -------------------------- | ------ |
| fileList | 选项列表 | ^[Array]`UploadUserFile[]` | -      |

### Slots

| 事件名  | 说明     | 类型                                              |
| ------- | -------- | ------------------------------------------------- |
| default | 默认内容 | ^[Object]`{data: UploadUserFile; meta: FileMeta}` |
