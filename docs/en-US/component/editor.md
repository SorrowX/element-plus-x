---
title: Editor
lang: zh-CN
---

# Editor 极简编辑器

可得到`html`标签内容，且能插入自定义元素，含有提及和字数统计功能的极简编辑器。

## 基础用法

使用`v-model`双向绑定`html`值。使用`enter`事件来处理什么(比如发送消息之类的)
:::demo 按住`ctrl+enter`或`shift+enter`回车换行。

editor/basic

:::

## 高度

使用`style`样式来直接控制编辑器的宽高
:::demo

editor/height

:::

## 提及

使用`prefix`属性来修改唤醒词。使用`options`属性来注入提及列表的值
:::demo`options`也可以是返回`Promise实例`的函数。

editor/mention

:::

## 自定义提及列表

使用`header` `label` `footer`插槽，分别对列表的头部，内容，尾部进行自定义 ui。
:::demo 如何你想完全自定义提及列表，建议使用`content`插槽

editor/slot

:::

## 插入

使用 组件实例的`insertHtml`方法来插入`文本` `html` `自定义元素`
:::demo

editor/api

:::

## 字数统计及限制

使用`maxlength`属性来控制最大输入字数
:::demo

editor/count

:::

:::tip
该组件是基于 [tiptap](https://tiptap.dev/docs/editor/getting-started/overview) 及 [el-tooltip](https://element-plus.org/zh-CN/component/tooltip.html) 封装而来。

element-plus-x 并不会打包该代码，需要用户自行安装相关依赖。该组件依赖如下安装包。

::: code-group

```shell [npm]
$ npm install @tiptap/core @tiptap/vue-3 @tiptap/starter-kit @tiptap/extension-mention @tiptap/extension-placeholder @tiptap/extension-character-count  --save
```

```shell [yarn]
$ yarn add @tiptap/core @tiptap/vue-3 @tiptap/starter-kit @tiptap/extension-mention @tiptap/extension-placeholder @tiptap/extension-character-count
```

```shell [pnpm]
$ pnpm install @tiptap/core @tiptap/vue-3 @tiptap/starter-kit @tiptap/extension-mention @tiptap/extension-placeholder @tiptap/extension-character-count
```

如果用户需要使用其他插件包，可自行安装后，通过使用该组件的 `extensions` 属性进行扩展。

:::

## API

### 属性

| 属性名     | 说明                                      | 类型            | 默认值 |
| ---------- | ----------------------------------------- | --------------- | ------ |
| v-model    | 绑定的 html                               | string          | -      |
| maxlength  | 最大输入长度                              | string          | -      |
| options    | 提及选项列表                              | array\|function | -      |
| prefix     | 触发字段的前缀。 字符串长度必须且只能为 1 | string          | @      |
| extensions | tiptap 扩展包                             | array           | -      |
| disabled   | 是否禁用                                  | boolean         | false  |

### Events

| 方法名     | 说明            | 参数           |
| ---------- | --------------- | -------------- |
| insertHtml | 插入文本或 html | `html: string` |
| resetHtml  | 重置文本或 html | `html: string` |
| getHtml    | 获取 html 值    | -              |
| getText    | 获取 纯文本     | -              |

### Slots

| 插槽名  | 说明                   | 参数                                     |
| ------- | ---------------------- | ---------------------------------------- |
| prepend | 编辑器前置插槽         | -                                        |
| append  | 编辑器后置插槽         | -                                        |
| header  | 提及列表头插槽         | -                                        |
| label   | 提及列表 label 插槽    | `{ item: MentionOption, index: number }` |
| footer  | 提及列表尾部插槽       | -                                        |
| content | 完全自定义提及列表插槽 | `{ items: MentionOption[] }`             |
