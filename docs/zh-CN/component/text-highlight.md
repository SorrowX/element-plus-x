---
title: TextHighlight 文本凸显
lang: zh-CN
---

# TextHighlight 文本凸显

对一段文本内容中的关键词凸显，适用于搜索出来的文本。

## 基础用法

`content`用于展示所有的文本

:::demo `text`属性用于高亮的文本

text-highlight/basic

:::

## 颜色

使用`color`属性来高亮凸显的文本

:::demo

text-highlight/color

:::

## 忽略大小写

使用`ignore-case`属性来忽略大小写

:::demo

text-highlight/ignore

:::

## API

### 属性

| 属性名      | 说明                         | 类型       | 默认值  |
| ----------- | ---------------------------- | ---------- | ------- |
| content     | 显示的内容(只能是字符串文本) | ^[String]  | -       |
| text        | 凸显的文本                   | ^[String]  | -       |
| color       | 凸显文本的颜色               | ^[String]  | #1677FF |
| ignore-case | 是否忽略凸显文本大小写       | ^[Boolean] | false   |
