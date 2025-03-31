---
title: Contextmenu 右键菜单
lang: zh-CN
---

# Contextmenu 右键菜单

自定义右键菜单时使用

## 基础用法

使用`menu`插槽自定义右键菜单 UI。

:::demo 使用组件的`hide`方法来关闭弹窗。

contextmenu/basic

:::

## 单例模式

使用组件的`handleContextMenu`方法来处理右键。

:::demo 当处理动态列表时，建议使用单例模式。动态循环该组件也能实现，只不过需要处理的逻辑会多点

contextmenu/list

:::

## 级联面板

使用`options`展示列表，使用`change`事件来接受选中的值

:::demo 参考 [el-dropdown-v2-panel 面板 api](/zh-CN/component/dropdown-v2)

contextmenu/options

:::

## API

### 属性

| 属性名  | 说明                                                   | 类型                     | 默认值 |
| ------- | ------------------------------------------------------ | ------------------------ | ------ |
| data    | 当循环列表时特别有用，传入的值，可以在 menu 插槽中拿到 | ^[null]                  | -      |
| options | 级联选项                                               | ^[Array]`CascaderOption` | -      |

### Slots

| 事件名  | 说明         | 参数              |
| ------- | ------------ | ----------------- |
| default | 右键的触发器 | -                 |
| menu    | 右键的菜单   | ^[Object]`{data}` |

### Exposes

| 名称              | 详情     | 类型                            |
| ----------------- | -------- | ------------------------------- |
| hide              | 关闭弹窗 | ^[Function]`() => void`         |
| handleContextMenu | 右击菜单 | ^[Function]`(e: Mouse) => void` |
