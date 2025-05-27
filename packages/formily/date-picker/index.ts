import { defineComponent, h } from 'vue'
import { connect, mapProps, mapReadPretty, useField } from '@formily/vue'
import { isVoidField } from '@formily/core'
import { ElDatePicker } from 'element-plus'
import { PreviewText } from '../preview-text'
import { getDefaultFormat } from './util'

/**
 * 为什么不通过 transformComponent方法 转换 'update:modelValue' => change ？
 * 1. 现象: 使用组件时change回调会被执行2次
 * 2. 根本原因: update:modelValue转change后，
 *    选择时间后ElDatePicker先触发了‘update:modelValue’事件一次[这时change会执行一次]，
 *    然后时间选择器弹窗打开/关闭时(如果所选的时间不同的话)又触发了‘change’事件一次[这时change又会执行一次]
 *    所以会出现change回调被执行2次的现象
 * 3. 解决方法: 把 ElDatePicker组件包一下，且手动处理 'onUpdate:modelValue' 更新field字段值，触发更新即可
 */
const TransformElDatePicker = defineComponent({
  name: 'TransformElDatePicker',
  setup(props, { attrs, slots }) {
    const fieldRef = useField()
    return () => {
      const field = fieldRef.value
      const originUpdateModelValue: any = attrs['onUpdate:modelValue']
      return h(
        ElDatePicker,
        {
          ...attrs,
          'onUpdate:modelValue': function (...args: any[]) {
            if (!isVoidField(field)) field.onInput(...args)
            originUpdateModelValue && originUpdateModelValue(...args)
          },
        },
        slots
      )
    }
  },
})

export const DatePicker = connect(
  TransformElDatePicker,
  mapProps(
    {
      value: 'modelValue',
      readOnly: 'readonly',
    },
    (props) => {
      return {
        ...props,
        format: props.format || getDefaultFormat(props),
        valueFormat:
          props.valueFormat || getDefaultFormat(props, 'valueFormat'),
      }
    }
  ),
  mapReadPretty(PreviewText.DatePicker)
)

export default DatePicker
