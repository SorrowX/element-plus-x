---
title: Emoji 表情包
lang: zh-CN
---

# 表情包

适用于微信表情的表情包选择器。

## `表情`-面板

使用`type`属性来绑定所需的值。

:::demo 使用`v-model`来绑定选中的表情值

emoji/panel

:::

## `字符表情`-面板

`字符表情`不支持`type`属性，只会返回字体文字

:::demo

emoji/font

:::

## `表情`-弹窗

大多数场景需要把表情包放入弹窗中
:::demo

emoji/basic

:::

## `文字`转`img`

可能有业务需求是需要把文案转成图片

比如 `早上好[流泪]` -> `早上好<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/5.gif" alt="[流泪]">`
:::demo 使用`emotionParser`函数来转换即可

emoji/parser

:::

## API

### Emoticon/Emoji 属性

| 属性名     | 说明                       | 类型                           | 默认值 |
| ---------- | -------------------------- | ------------------------------ | ------ |
| v-model    | 双向绑定的值               | `string`                       | -      |
| type       | 绑定值的类型               | ^[enum]`text \| code \| image` | -      |
| keep-alive | 关闭弹窗时是否保留面板内容 | ^[boolean]                     | true   |

### Emoticon/Emoji Events

| 方法名 | 说明             | 参数            |
| ------ | ---------------- | --------------- |
| change | 值发生变化时触发 | `value: string` |
