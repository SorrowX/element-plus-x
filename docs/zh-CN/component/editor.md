---
title: Editor
lang: zh-CN
---

# Editor 极简编辑器

可得到`html`标签内容，且能插入自定义元素，含有提及和字数统计功能的极简编辑器。

该组件基于 [Tiptap](https://tiptap.dev/docs/editor/getting-started/overview) 及 [ElTooltip](https://element-plus.org/zh-CN/component/tooltip.html) 封装而来。

## 基础用法

使用`v-model`双向绑定`html`值。使用`enter`事件来处理什么(比如发送消息之类的)
:::demo 按住`ctrl+enter`或`shift+enter`回车换行。

editor/basic

:::

## 宽高

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

## 插入任意内容（component 插件）

Tiptap 是不支持插入任意原生标签的，且支持的元素(比如 h1 和 p)也不支持编写内联样式。于是 editor 内置了`component 插件`用来解决此问题，使用姿势和 vue 中的`component`类似
:::demo `component 插件`相比 vue 中的`component`有一些限制。1：子内容只能最为组件的默认插槽，其他插槽不支持 2：属性只能传递字符串，引用类型不支持 3：上述问题可以通过把复杂的业务 UI 封装到一个 Vue 组件中(ui 的交互全在该组件中编写)，最后用`component`渲染即可

editor/component

:::

## 字数统计及限制

使用`maxlength`属性来控制最大输入字数
:::demo

editor/count

:::

## 表情包插入

配合`ElEmoji`表情包来插入图片
:::demo 可以使用`setImage`方法

editor/image

:::

## 视频插入

:::demo 使用`setVideo`方法来插入视频，参数参考 `ISetVideOptions`

editor/video

:::

## 工具栏配置

使用`toolbar-list`来配置需要展示的工具

上传图片时，可以根据配置`onChange`回调拿到相关参数，调用后端接口获取真实 url,然后进行回显
:::demo

editor/toolbar

:::

## 转换为纯文本(html2text)

Tiptap 支持自定义标签来渲染任意 ui,但是调用实例 getText 方法并不会返回文本，下面这个案例是把自定义标签解析成对应的值传给后端

:::demo html 内容可以用来回显编辑器的内容，有时需要解析 html 变成纯文本给后端，可以使用`getTextContent`方法即可,回车换行符 br 默认替换成了`\n`

editor/text

:::

## 极简编辑器

使用`ElEditorToolbar`组件来渲染工具栏，使用`character-count`插槽来渲染文字统计。

编辑器内部的样式可以按照不同业务需求自定义样式
:::demo 如果当做富文本编辑器时，记得使用`disable-enter-emit`属性来关闭其内部回车发送事件

editor/editor

:::

## API

### 属性

| 属性名             | 说明                                      | 类型            | 默认值 |
| ------------------ | ----------------------------------------- | --------------- | ------ |
| v-model            | 绑定的 html                               | string          | -      |
| maxlength          | 最大输入长度                              | string          | -      |
| options            | 提及选项列表                              | array\|function | -      |
| prefix             | 触发字段的前缀。 字符串长度必须且只能为 1 | string          | @      |
| extensions         | tiptap 扩展包                             | array           | -      |
| disabled           | 是否禁用                                  | boolean         | false  |
| disable-enter-emit | 是否禁用回车 enter 事件                   | boolean         | false  |
| border             | 编辑器是否有边框                          | boolean         | true   |

### Methods

| 方法名     | 说明            | 参数                                                                |
| ---------- | --------------- | ------------------------------------------------------------------- |
| insertHtml | 插入文本或 html | ^[Function]`(html: string, options?: InsertContentOptions) => void` |
| resetHtml  | 重置文本或 html | ^[Function]`(html: string) => void`                                 |
| getHtml    | 获取 html 值    | -                                                                   |
| getText    | 获取 纯文本     | -                                                                   |
| setImage   | 插入图片        | ^[Function]`(options: ISetImageOptions) => void`                    |

### Slots

| 插槽名  | 说明                   | 参数                                              |
| ------- | ---------------------- | ------------------------------------------------- |
| prepend | 编辑器前置插槽         | -                                                 |
| append  | 编辑器后置插槽         | -                                                 |
| header  | 提及列表头插槽         | -                                                 |
| label   | 提及列表 label 插槽    | ^[Object]`{ item: MentionOption, index: number }` |
| footer  | 提及列表尾部插槽       | -                                                 |
| content | 完全自定义提及列表插槽 | ^[Object]`{ items: MentionOption[] }`             |

### ElEditorToolbar 属性

| 属性名       | 说明       | 类型                                                                                                                                                                                                                                   | 默认值 |
| ------------ | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| editor       | 编辑器实例 | ^[Object]`IEditor`                                                                                                                                                                                                                     | -      |
| toolbar-list | 工具栏列表 | ^[Array]`'bold' \| 'strike' \| 'italic' \| 'underline' \| 'ordered' \| 'bullet' \| 'blockquote' \| 'code' \| 'horizontal' \| 'alignLeft' \| 'alignRight' \| 'alignCenter' \| 'alignJustify' \| 'emoji' \| 'image' \| 'undo' \| 'redo'` | -      |
| configure    | 工具栏配置 | ^[Object]`IToolbarConfigure`                                                                                                                                                                                                           | -      |
