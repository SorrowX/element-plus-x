---
title: InputOtp 验证码
lang: zh-CN
---

# InputOtp 验证码

输入验证码

## 基础用法

使用`v-model`绑定数组即可

:::demo

input-otp/basic

:::

## 状态

使用`ElInput`组件的原始属性即可

:::demo

input-otp/status

:::

## 大小

相比`ElInput`组件的`size`属性值，多了一个`auto`值

:::demo

input-otp/size

:::

## 位数

使用`length`属性来控制控件的个数

:::demo

input-otp/length

:::

## 自定义渲染

使用默认插槽，根据抛出的`index`及当前输入框的`value`值，可以做点什么

:::demo

input-otp/slot

:::

## 校验

使用`validator`校验函数，返回`false`则停止输入

:::demo

input-otp/validator

:::

## 配合 Form

使用`ElForm`组件的`rules`属性即可

:::demo

input-otp/form

:::

## API

### 属性

其他相关 API 属性，请参考 [ElInput](https://element-plus.org/zh-CN/component/input) 即可，剩下则是 `InputOtp` 组件独有的 API 属性

| 属性名      | 说明       | 类型                                                                               | 默认值 |
| ----------- | ---------- | ---------------------------------------------------------------------------------- | ------ |
| model-value | 双向绑定值 | ^[Array]`string[] \| number[]`                                                     | -      |
| validator   | 校验器     | ^[Function]`(inputValue: string, index: number, modelValueStr: string) => boolean` | -      |
| size        | 尺寸大小   | ^[String]`small\|default\|large\|auto`                                             | -      |
| gap         | 间隙       | ^[Number]                                                                          | 8      |

### Slots

| 事件名  | 说明     | 参数                             |
| ------- | -------- | -------------------------------- |
| default | 默认内容 | `(index: number, value: string)` |

### Exposes

| 名称      | 详情                        | 类型 |
| --------- | --------------------------- | ---- |
| inputRefs | 所有 `ElInput` 组件实例集合 | -    |
