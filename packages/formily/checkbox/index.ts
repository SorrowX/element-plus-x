import { defineComponent, h } from 'vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElCheckbox, ElCheckboxButton, ElCheckboxGroup } from 'element-plus'
import { PreviewText } from '../preview-text'
import {
  composeExport,
  resolveComponent,
  transformComponent,
} from '../__builtins__/shared'
import type { Component, PropType } from 'vue'
import type { SlotTypes } from '../__builtins__/shared'
import type {
  CheckboxGroupProps as ElCheckboxGroupProps,
  CheckboxProps as ElCheckboxProps,
} from 'element-plus'

type IOptionData = {
  value: ElCheckboxProps['value']
  label: SlotTypes
  disabled?: boolean
  border?: boolean
}

type IOption = IOptionData | string

export type CheckboxGroupProps = ElCheckboxGroupProps & {
  options?: IOption[]
  optionType: 'default' | 'button'
}

export type CheckboxProps = ElCheckboxProps & {
  optionType: 'default' | 'button'
}

const CheckboxOption = defineComponent<CheckboxProps>({
  name: 'Checkbox',
  inheritAttrs: false,
  props: {
    optionType: {
      type: String as PropType<CheckboxProps['optionType']>,
      default: 'default',
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const option = {
        label: attrs.label,
        value: attrs.value,
      }
      return h(
        props.optionType === 'button' ? ElCheckboxButton : ElCheckbox,
        {
          ...attrs,
        },
        {
          default: () => [
            resolveComponent(slots.default ?? (option as IOptionData)?.label, {
              option,
            }),
          ],
        }
      )
    }
  },
})

const CheckboxGroupOption = defineComponent<CheckboxGroupProps>({
  name: 'CheckboxGroup',
  props: {
    options: {
      type: Array as PropType<CheckboxGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<CheckboxGroupProps['optionType']>,
      default: 'default',
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const options = props.options || []
      const OptionType = (
        props.optionType === 'button' ? ElCheckboxButton : ElCheckbox
      ) as Component

      return h(
        ElCheckboxGroup,
        {
          ...attrs,
        },
        {
          ...slots,
          default: () =>
            options.map((option: IOption) => {
              if (typeof option === 'string') {
                return h(
                  OptionType,
                  { label: option, value: option, key: option },
                  {
                    default: () => [
                      resolveComponent(slots?.option ?? option, { option }),
                    ],
                  }
                )
              } else {
                return h(
                  OptionType,
                  {
                    key: String(option.value),
                    ...option,
                  },
                  {
                    default: () => [
                      resolveComponent(slots?.option ?? option.label, {
                        option,
                      }),
                    ],
                  }
                )
              }
            }),
        }
      )
    }
  },
})

const CheckboxGroup = connect(
  transformComponent(CheckboxGroupOption, {
    change: 'update:modelValue',
  }),
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(PreviewText.Select, { multiple: true })
)

export const Checkbox = composeExport(
  connect(
    transformComponent(CheckboxOption, {
      change: 'update:modelValue',
    }),
    mapProps({ value: 'modelValue' }),
    mapReadPretty(PreviewText.Select)
  ),
  {
    Group: CheckboxGroup,
  }
)

export default Checkbox
