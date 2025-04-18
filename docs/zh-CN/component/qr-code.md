---
title: QRCode 二维码
lang: zh-CN
---

# QRCode 二维码

把文本转成二维码

## 基础用法

使用`text`属性来生成二维码内容

:::demo

qr-code/basic

:::

## 图标

使用`icon-src`地址在二维码中间生成一个图标

:::demo 使用`icon-config`来配置`icon`的`圆角` `内边距` `大小` `背景色`

qr-code/icon

:::

## 尺寸

使用`size`来指定尺寸

:::demo

qr-code/size

:::

## 颜色

使用`color`来指定码的颜色，使用`background-color`属性来指定背景颜色

:::demo 使用 `margin` 值来指定外边距

qr-code/color

:::

## 纠错

使用[QR Code options](https://github.com/soldair/node-qrcode?tab=readme-ov-file#options)来指定选项

:::demo 使用选项 `errorCorrectionLevel` 属性即可，`options`选项中的值优先级最大

qr-code/level

:::

## 下载

使用组件实例的`downloadQRCode`方法即可

:::demo

qr-code/download

:::

## API

### 属性

| 属性名           | 说明                                                                                           | 类型                                     | 默认值 |
| ---------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------- | ------ |
| text             | 内容                                                                                           | ^[String]                                | -      |
| options          | [QR Code options](https://github.com/soldair/node-qrcode?tab=readme-ov-file#options)来指定选项 | ^[Object]`QRCode.QRCodeToDataURLOptions` | -      |
| size             | 二维码的宽高                                                                                   | ^[Number]                                | 120    |
| margin           | 二维码的 margin 值                                                                             | ^[Number]                                | 2      |
| color            | 码的颜色                                                                                       | ^[String]                                | -      |
| background-color | 码的背景色                                                                                     | ^[String]                                | -      |
| icon-src         | 中间图片地址                                                                                   | ^[String]                                | -      |
| icon-config      | 中间图片的配置                                                                                 | ^[Object]`IconConfig`                    | -      |

### Exposes

| 名称           | 详情       | 类型                                |
| -------------- | ---------- | ----------------------------------- |
| downloadQRCode | 下载二维码 | ^[Function]`(name?:string) => void` |
