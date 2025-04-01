---
title: Select
lang: zh-CN
---

# Select

下拉框组件

## Markup Schema 同步数据源案例

:::demo

f-select/markup-schema-sync

:::

## Markup Schema 异步搜索案例

:::demo

f-select/markup-schema-async-search

:::

## Markup Schema 异步搜索案例

组件属性`remoteMethod`的写法

:::demo

f-select/markup-schema-async-search2

:::

## Markup Schema 异步联动数据源案例

:::demo

f-select/markup-schema-async

:::

## Markup Schema 插槽案例

如果你想拿到插槽作用域属性值，`render`函数必须至少有 2 个参数，这是受 [ReactiveField](https://github.com/alibaba/formily/blob/formily_next/packages/vue/src/components/ReactiveField.ts)组件 merge slots 的实现所约束

```ts
const resolveComponent = (render: () => unknown[], extra?: any) => {
  // ...
  // for scoped slot
  if (extra.length > 1 || extra?.render?.length > 1) {
    return (scopedProps: VueComponentProps<any>) => [
      ...render(),
      h(extra, { props: scopedProps }, {}),
    ]
  }
  // ...
}
```

:::demo 支持 `el-select` 所有插槽，`el-option` 的默认插槽改成了 `option` 插槽(因为 el-select 也有默认插槽)

f-select/markup-schema-slot

:::

## JSON Schema 同步数据源案例

:::demo

f-select/json-schema-sync

:::

## JSON Schema 异步联动数据源案例

:::demo

f-select/json-schema-async

:::

## Template 同步数据源案例

:::demo

f-select/template-sync

:::

## Template 异步联动数据源案例

:::demo

f-select/template-async

:::

## API

参考 [ElSelect](https://element-plus.org/zh-CN/component/select.html)
