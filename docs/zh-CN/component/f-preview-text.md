---
title: PreviewText
lang: zh-CN
---

# PreviewText

阅读态组件，主要用来实现类 Input，类 DatePicker 这些组件的阅读态

## 简单案例

:::demo

f-preview-text/base

:::

## 扩展案例

:::demo

f-preview-text/extend

:::

## 显示类型

`FPreviewTextSelect` 和 `FPreviewTextCascader` 组件支持 2 种显示类型及自定义分隔符

:::demo

f-preview-text/form

:::

## API

### PreviewText.Input

参考 [https://element-plus.org/zh-CN/component/input.html](https://element-plus.org/zh-CN/component/input.html)

### PreviewText.Select

参考 [https://element-plus.org/zh-CN/component/select.html](https://element-plus.org/zh-CN/component/select.html)

| 属性名      | 说明               | 类型                  | 默认值 |
| ----------- | ------------------ | --------------------- | ------ |
| displayType | 显示类型           | ^[String]`tag\|text>` | tag    |
| separator   | 数组转字符串分隔符 | `String`              | ;      |

### PreviewText.Cascader

参考 [https://element-plus.org/zh-CN/component/cascader.html](https://element-plus.org/zh-CN/component/cascader.html)

| 属性名      | 说明               | 类型                  | 默认值 |
| ----------- | ------------------ | --------------------- | ------ |
| displayType | 显示类型           | ^[String]`tag\|text>` | tag    |
| separator   | 数组转字符串分隔符 | `String`              | ;      |

### PreviewText.DatePicker

参考 [https://element-plus.org/zh-CN/component/date-picker.html](https://element-plus.org/zh-CN/component/date-picker.html)

### PreviewText.TimePicker

参考 [https://element-plus.org/zh-CN/component/datetime-picker.html](https://element-plus.org/zh-CN/component/datetime-picker.html)

### PreviewText

| 属性名 | 类型   | 描述       | 默认值 |
| ------ | ------ | ---------- | ------ |
| value  | stirng | 缺省占位符 | N/A    |

### PreviewText.Placeholder

| 属性名 | 类型   | 描述       | 默认值 |
| ------ | ------ | ---------- | ------ |
| value  | stirng | 缺省占位符 | N/A    |

### PreviewText.usePlaceholder

```ts pure
interface usePreviewTextPlaceholder {
  (): string
}
```
