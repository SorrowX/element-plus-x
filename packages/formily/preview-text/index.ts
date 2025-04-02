import { Ref, computed, defineComponent, h, toRef } from 'vue'
import { Field } from '@formily/core'
import { observer } from '@formily/reactive-vue'
import { useField } from '@formily/vue'
import { isArr, isValid } from '@formily/shared'
import { ElSpace, ElTag, formatter, useLocale } from 'element-plus'
import { getDefaultFormat } from '../date-picker/util'
import {
  composeExport,
  createContext,
  resolveComponent,
  useContext,
} from '../__builtins__/shared'
import { stylePrefix } from '../__builtins__/configs'

import type { SelectProps } from '../select'
import type { CascaderProps } from '../cascader'
import type { DatePickerProps } from '../date-picker/util'
import type { TimePickerProps } from '../time-picker'

const prefixCls = `${stylePrefix}-preview-text`
const PlaceholderContext = createContext('N/A')
const defaultSeparator = '; '

export const usePlaceholder = (value?: Ref<any>) => {
  const placeholderCtx = useContext(PlaceholderContext)
  const placeholder = computed(() => {
    return isValid(value?.value) && value?.value !== ''
      ? value?.value
      : resolveComponent(placeholderCtx.value) || 'N/A'
  })
  return placeholder
}

const Input = observer(
  defineComponent({
    name: 'FPreviewTextInput',
    props: {
      value: {
        type: null,
      },
    },
    setup(props, { attrs, slots }) {
      const value = toRef(props, 'value')
      const placeholder = usePlaceholder(value)
      return () => {
        return h(
          ElSpace,
          {
            class: [prefixCls],
            style: { ...(attrs.style ?? {}) },
          },
          {
            default: () =>
              [
                slots?.prepend?.(),
                slots?.prefix?.(),
                placeholder.value,
                slots?.suffix?.(),
                slots?.append?.(),
              ].filter((child) => !!child),
          }
        )
      }
    },
  })
)

const Select = observer(
  defineComponent<SelectProps>({
    name: 'FPreviewTextSelect',
    setup(_props, { attrs }) {
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as SelectProps
      const placeholder = usePlaceholder()
      const getSelected = () => {
        const value = props.value
        if (props.multiple) {
          return isArr(value)
            ? value.map((val) => ({ label: val, value: val }))
            : []
        } else {
          return isValid(value) ? [{ label: value, value }] : []
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        const dataSource: any[] = field?.dataSource?.length
          ? field.dataSource
          : props?.options?.length
          ? props.options
          : []
        if (!selected.length) {
          return h(
            ElTag,
            {},
            {
              default: () => placeholder.value,
            }
          )
        }
        return selected.map(({ value, label }, key) => {
          const text =
            dataSource?.find((item) => item.value == value)?.label || label
          return h(
            ElTag,
            {
              key,
              type: 'info',
              effect: 'light',
            },
            {
              default: () => text || placeholder.value,
            }
          )
        })
      }

      return () => {
        return h(
          ElSpace,
          {
            class: [prefixCls],
            style: { ...(attrs.style ?? {}) },
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

const Cascader = observer(
  defineComponent<CascaderProps>({
    name: 'FPreviewTextCascader',
    setup(_props, { attrs }) {
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as CascaderProps
      const dataSource: any[] = field?.dataSource?.length
        ? field.dataSource
        : props?.options?.length
        ? props.options
        : []
      const placeholder = usePlaceholder()
      const valueKey = props.props?.value || 'value'
      const labelKey = props.props?.label || 'label'
      const getSelected = () => {
        return isArr(props.value) ? props.value : []
      }

      const findLabel: (value: any, dataSource: any) => any = (
        value,
        dataSource
      ) => {
        for (let i = 0; i < dataSource?.length; i++) {
          const item = dataSource[i]
          if (item?.[valueKey] === value) {
            return item?.[labelKey]
          } else {
            const childLabel = findLabel(value, item?.children)
            if (childLabel) return childLabel
          }
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        if (!selected?.length) {
          return h(
            ElTag,
            {},
            {
              default: () => placeholder.value,
            }
          )
        }
        return selected.map((value, key) => {
          const text = findLabel(value, dataSource)
          return h(
            ElTag,
            {
              key,
              type: 'info',
              effect: 'light',
            },
            {
              default: () => text || placeholder.value,
            }
          )
        })
      }

      return () => {
        return h(
          ElSpace,
          {
            class: [prefixCls],
            style: { ...(attrs.style ?? {}) },
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

const DatePicker = defineComponent<
  DatePickerProps & { value: DatePickerProps['modelValue'] }
>({
  name: 'FPreviewTextDatePicker',
  setup(_props, { attrs }) {
    const { lang } = useLocale()
    const placeholder = usePlaceholder()
    const format = getDefaultFormat(attrs as DatePickerProps)

    const getLabels = () => {
      if (isArr(attrs.value)) {
        const labels = attrs.value.map(
          (value: string | Date) =>
            formatter(value, format as string, lang.value) || placeholder.value
        )
        return labels.join('~')
      } else {
        return (
          formatter(
            attrs.value as string | Date,
            format as string,
            lang.value
          ) || placeholder.value
        )
      }
    }

    return () => {
      return h(
        'div',
        {
          class: [prefixCls, `${prefixCls}__date-picker`],
          style: attrs.style,
        },
        {
          default: () => getLabels(),
        }
      )
    }
  },
})

const TimePicker = defineComponent<
  TimePickerProps & { value: TimePickerProps['modelValue'] }
>({
  name: 'FPreviewTextTimePicker',
  setup(_props, { attrs }) {
    const { lang } = useLocale()
    const placeholder = usePlaceholder()
    const format = attrs.format || 'HH:mm:ss'

    const getLabels = () => {
      if (isArr(attrs.value)) {
        const labels = attrs.value.map(
          (value: string | Date) =>
            formatter(value, format as string, lang.value) || placeholder.value
        )
        return labels.join('~')
      } else {
        return (
          formatter(
            attrs.value as string | Date,
            format as string,
            lang.value
          ) || placeholder.value
        )
      }
    }

    return () => {
      return h(
        'div',
        {
          class: [prefixCls, `${prefixCls}__time-picker`],
          style: attrs.style,
        },
        {
          default: () => getLabels(),
        }
      )
    }
  },
})

const Text = defineComponent<any>({
  name: 'FPreviewText',
  setup(_props, { attrs }) {
    const placeholder = usePlaceholder()

    return () => {
      return h(
        'div',
        {
          class: [prefixCls],
          style: attrs.style,
        },
        {
          default: () => placeholder.value,
        }
      )
    }
  },
})

const TextArray = observer(
  defineComponent({
    name: 'FPreviewTextArray',
    setup(_props, { attrs }) {
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as SelectProps
      const placeholder = usePlaceholder()

      const getItem = (value: any) => {
        const dataSource: any[] = field?.dataSource?.length
          ? field.dataSource
          : props?.options?.length
          ? props.options
          : []
        const item = dataSource.find((_) => _.value === value)
        return {
          label: item?.label ?? value,
          value: item?.value ?? value,
        }
      }

      const getSelected = () => {
        const value = props.value

        if (props.multiple) {
          return isArr(value) ? value.map((val) => getItem(val)) : []
        } else {
          return isValid(value) ? [getItem(value)] : []
        }
      }

      const getLabels = () => {
        const selected = getSelected()
        const separator = props.separator ?? defaultSeparator
        const text = selected.length
          ? selected.map((_) => _.label).join(separator)
          : placeholder.value
        return h('div', { class: [prefixCls] }, text)
      }

      return () => {
        return h(
          ElSpace,
          {
            class: [prefixCls],
            style: { ...(attrs.style ?? {}) },
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

const TextSwitch = defineComponent({
  name: 'FPreviewTextSwitch',
  props: {
    value: {
      type: null,
    },
  },
  setup(props, { attrs }) {
    const value = toRef(props, 'value')
    const activeText = attrs.activeText ?? attrs['active-text']
    const inactiveText = attrs.inactiveText ?? attrs['inactive-text']
    const activeValue = attrs.activeValue ?? attrs['active-value']
    const inactiveValue = attrs.inactiveValue ?? attrs['inactive-value']

    return () => {
      const placeholder = usePlaceholder(value)
      const realValue = value.value

      const text =
        realValue === activeValue
          ? activeText ?? realValue
          : realValue === inactiveValue
          ? inactiveText ?? realValue
          : placeholder.value

      return h(
        ElSpace,
        {
          class: [prefixCls],
          style: { ...(attrs.style ?? {}) },
        },
        {
          default: () => text,
        }
      )
    }
  },
})

const TextTree = observer(
  defineComponent({
    name: 'FPreviewTextTree',
    setup(_props, { attrs }) {
      const fieldRef = useField<Field>()
      const field = fieldRef.value
      const props = attrs as unknown as CascaderProps

      const placeholder = usePlaceholder()
      const valueKey = props.props?.value || 'value'
      const labelKey = props.props?.label || 'label'
      const getSelected = (dataSource: any) => {
        const values = isArr(props.value)
          ? props.value
          : props.value
          ? [props.value]
          : []
        return values.map((value) => {
          return {
            label: findLabel(value, dataSource) ?? value,
            value,
          }
        })
      }

      const findLabel: (value: any, dataSource: any) => any = (
        value,
        dataSource
      ) => {
        for (let i = 0; i < dataSource?.length; i++) {
          const item = dataSource[i]
          if (item?.[valueKey] === value) {
            return item?.[labelKey]
          } else {
            const childLabel = findLabel(value, item?.children)
            if (childLabel) return childLabel
          }
        }
      }

      const getLabels = () => {
        const dataSource: any[] = field?.dataSource?.length
          ? field.dataSource
          : props?.options?.length
          ? props.options
          : []

        const selected = getSelected(dataSource)
        const separator = props.separator ?? defaultSeparator
        const text = selected.length
          ? selected.map((_) => _.label).join(separator)
          : placeholder.value
        return h('div', { class: [prefixCls] }, text)
      }

      return () => {
        return h(
          ElSpace,
          {
            class: [prefixCls],
            style: { ...(attrs.style ?? {}) },
          },
          {
            default: () => getLabels(),
          }
        )
      }
    },
  })
)

export const PreviewText = composeExport(Text, {
  Input,
  Select,
  Cascader,
  DatePicker,
  TimePicker,
  Placeholder: PlaceholderContext.Provider,
  usePlaceholder,
  TextArray,
  TextSwitch,
  TextTree,
}) as any

export default PreviewText
