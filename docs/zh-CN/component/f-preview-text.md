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

## 切换

:::demo

f-preview-text/form

:::

## API

### PreviewText.Input

参考 [https://element-plus.org/zh-CN/component/input.html](https://element-plus.org/zh-CN/component/input.html)

### PreviewText.Select

参考 [https://element-plus.org/zh-CN/component/select.html](https://element-plus.org/zh-CN/component/select.html)

### PreviewText.Cascader

参考 [https://element-plus.org/zh-CN/component/cascader.html](https://element-plus.org/zh-CN/component/cascader.html)

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
