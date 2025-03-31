---
title: DrawerV2 抽屉
lang: zh-CN
---

# DrawerV2 抽屉

抽屉，只需关心弹窗内容。`DrawerV2`组件的使用姿势与`DialogV2`组件使用姿势几乎一致。

## 基础用法

`triggerProps`对象类型是`Partial<ButtonProps> & {triggerText?: string }`

:::demo 使用`triggerProps`对象的`triggerText`属性来快速设置触发器按钮的文案

drawer-v2/basic

:::

## 取消、确定

`cancelProps`对象类型是`Partial<ButtonProps> & {hidden?: boolean; cancelText?: string}`

`sureProps`对象类型是`Partial<ButtonProps> & {hidden?: boolean; sureText?: string}`
:::demo 使用这 2 个属性可以快速设置`取消`和`确定`按钮的文案及样式

drawer-v2/props

:::

## 按钮回调

`onSure`和`onCancel`回调函数的参数含有`close`方法，用户可自行根据业务选择性调用

:::demo 如果不设置这 2 个函数，点击后默认自动关闭弹窗

drawer-v2/event

:::

## 自定义触发器

有时需要完全自定义触发器 UI，这时紧靠`triggerProps`设置`ElButton`组件肯定满足不了，可以使用`trigger`插槽来自定义

:::demo 自定义的 ui 点击后默认冒泡，所以用户不必手动调用关闭弹窗的方法

drawer-v2/trigger

:::

## 自定义头部

可以使用`header`插槽来自定义头部

:::demo 该使用姿势和`ElDrawer`一致

drawer-v2/header

:::

## 自定义底部

可以使用`footer`插槽来自定义底部

:::demo 该使用姿势和`ElDrawer`一致

drawer-v2/footer

:::

## API

### 属性

弹窗其他相关的 API 属性，请参考 [ElDrawer](https://element-plus.org/zh-CN/component/drawer.html) 即可，剩下是 `DrawerV2` 组件独有的 API 属性

| 属性名        | 说明             | 类型                                                                     | 默认值 |
| ------------- | ---------------- | ------------------------------------------------------------------------ | ------ |
| trigger-props | 触发按钮属性设置 | ^[Object]`Partial<ButtonProps> & {triggerText?: string}`                 | -      |
| cancel-props  | 取消按钮属性设置 | ^[Object]`Partial<ButtonProps> & {hidden?: boolean;cancelText?: string}` | -      |
| sure-props    | 确定按钮属性设置 | ^[Object]`Partial<ButtonProps> & {hidden?: boolean;sureText?: string}`   | -      |
| on-cancel     | 点击取消时的回调 | ^[Function]`{ close }: { close: () => void }) => void`                   | -      |
| on-sure       | 点击确定时的回调 | ^[Function]`({ close }: { close: () => void }) => void \| Promise<any>`  | -      |

### Slots

| 事件名  | 说明             |
| ------- | ---------------- |
| default | 对话框的默认内容 |
| header  | 对话框标题的内容 |
| footer  | 对话框底部的内容 |
| trigger | 触发器插槽内容   |

### Exposes

| 名称  | 详情     | 类型                    |
| ----- | -------- | ----------------------- |
| open  | 打开弹窗 | ^[Function]`() => void` |
| close | 关闭弹窗 | ^[Function]`() => void` |
