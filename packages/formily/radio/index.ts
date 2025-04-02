import { defineComponent, h } from 'vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElRadio, ElRadioButton, ElRadioGroup } from 'element-plus'
import { PreviewText } from '../preview-text'
import {
  composeExport,
  resolveComponent,
  transformComponent,
} from '../__builtins__/shared'
import type { Component, PropType } from 'vue'
import type { SlotTypes } from '../__builtins__/shared'
import type {
  RadioGroupProps as ElRadioGroupProps,
  RadioProps as ElRadioProps,
} from 'element-plus'

type IOption =
  | {
      value: ElRadioProps['value']
      label: SlotTypes
      disabled?: boolean
      border?: boolean
    }
  | string

export type RadioGroupProps = ElRadioGroupProps & {
  options?: IOption[]
  optionType: 'default' | 'button'
}

export type RadioProps = ElRadioProps

const RadioGroupOption = defineComponent<RadioGroupProps>({
  name: 'FRadioGroup',
  props: {
    options: {
      type: Array as PropType<RadioGroupProps['options']>,
      default: () => [],
    },
    optionType: {
      type: String as PropType<RadioGroupProps['optionType']>,
      default: 'default',
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const options = props.options || []
      const OptionType = (
        props.optionType === 'button' ? ElRadioButton : ElRadio
      ) as Component

      return h(
        ElRadioGroup,
        {
          ...attrs,
        },
        {
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
          ...slots,
        }
      )
    }
  },
})

const RadioGroup = connect(
  transformComponent(RadioGroupOption, {
    change: 'update:modelValue',
  }),
  mapProps({ dataSource: 'options', value: 'modelValue' }),
  mapReadPretty(PreviewText.Select)
)
export const Radio = composeExport(ElRadio, {
  Group: RadioGroup,
})

export default Radio
