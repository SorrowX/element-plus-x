---
title: Submit 表单提交
lang: zh-CN
---

# Submit 表单提交

表单提交按钮，用户只需关心业务处理的按钮

## 基础用法

普通提交

:::demo `@submit` 和`:on-submit` 最终都会编译为`props`属性中的 `onSubmit`,所以 2 种写法都可以

submit/basic

:::

## 防重提交

submit 函数返回`Promise`实例即可

:::demo 可以使用`loading`属性为`false`去掉 loading 效果，但其内部还具有防重机制

submit/anti-heavy

:::

## API

### 属性

按钮相关的 API 属性，请参考 [el-button](https://element-plus.org/zh-CN/component/button.html) 即可，剩下是 Submit 组件独有的 API 属性

| 属性名            | 说明                                           | 类型                                       | 默认值 |
| ----------------- | ---------------------------------------------- | ------------------------------------------ | ------ |
| on-click          | 点击事件，如果返回 false 可以阻塞提交          | `(event: MouseEvent) => void \| boolean`   | -      |
| on-submit         | 表单校验通过后，执行的回调                     | `(values: object) => void \| Promise<any>` | -      |
| on-submit-success | onSubmit 方法异步成功时的回调                  | `(payload: any) => void`                   | -      |
| on-submit-failed  | 表单校验异常或者 onSubmit 方法内部异常时的回调 | `(feedbacks: unknown) => void`             | -      |
