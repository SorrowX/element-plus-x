---
title: JsonSchema
lang: zh-CN
---

# JsonSchema

通过配置来快速生成表单

## 使用案例

:::demo

f-json-schema/json1

:::

## 列表查询项

:::demo 除了使用`Space`布局也可以使用`FormGrid` `FormLayout`组件来进行布局，请参考各自文档

f-json-schema/search

:::

## 自定义组件

:::demo

f-json-schema/component

:::

## API

| 属性名          | 说明                                                                                                                        | 类型      | 默认值 |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- | --------- | ------ |
| iFormProps      | [createForm 函数的参数值](https://core.formilyjs.org/zh-CN/api/entry/create-form)                                           | ^[Object] | -      |
| components      | 自定义组件[ISchemaFieldFactoryProps 类型中的 components 属性值](https://vue.formilyjs.org/api/components/schema-field.html) | ^[Object] | -      |
| scope           | 模版编译选项 [ISchemaFieldFactoryProps 类型中的 scope 属性值](https://vue.formilyjs.org/api/components/schema-field.html)   | ^[Object] | -      |
| schema          | [schema 数据](https://vue.formilyjs.org/api/shared/schema.html)                                                             | ^[Object] | -      |
| forceCreateForm | 是否强制创建 form 实例，不使用继承关系的 form 实例                                                                          | ^[Object] | -      |
