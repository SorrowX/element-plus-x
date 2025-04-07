import { defineComponent, h } from 'vue'
import { connect, mapProps, mapReadPretty } from '@formily/vue'
import { ElOption, ElSelect } from 'element-plus'
import { PreviewText } from '../preview-text'
import { resolveComponent } from '../__builtins__'

type IOption = Pick<typeof ElOption, 'value' | 'label' | 'disabled'> | string
type IOptions = IOption[]

export type SelectProps = typeof ElSelect & {
  options?: IOptions
}

const SelectOption = defineComponent({
  name: 'FSelect',
  inheritAttrs: false,
  props: {
    options: {
      type: Array as () => IOptions,
      default: () => [],
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const options = props.options || []
      return h(
        ElSelect,
        {
          ...attrs,
        },
        {
          default: () =>
            options.map((option: IOption) => {
              if (typeof option === 'string') {
                return h(
                  ElOption,
                  { key: option, value: option, label: option },
                  {
                    default: () => [
                      resolveComponent(slots?.option, { option }),
                    ],
                  }
                )
              } else {
                return h(
                  ElOption,
                  {
                    key: option.value,
                    ...option,
                  },
                  {
                    default: () => [
                      resolveComponent(slots?.option, {
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

export const Select = connect(
  SelectOption,
  mapProps({ dataSource: 'options', value: 'modelValue', loading: true }),
  mapReadPretty(PreviewText.Select)
)

export default Select
