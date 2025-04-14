import { computed, defineComponent, h, unref } from 'vue'
import { ElButton, ElButtonGroup, ElIcon, useNamespace } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { dropdownV2Props } from './dropdown-v2'
import Panel from './panel'
import type { DropdownOption, DropdownValue } from './types'
import type { VNode } from 'vue'

const TRIGGER = 'trigger'

export default defineComponent({
  name: 'ElDropdownV2',
  props: dropdownV2Props,
  setup(props, { attrs, emit, slots }) {
    const ns = useNamespace('dropdown-v2')

    const renderIcon = (attrs?: any) => {
      return h(ElIcon, { ...attrs }, { default: () => h(ArrowDown) })
    }

    const renderButton = (vNode?: VNode) => {
      const { triggerProps } = props
      return h(
        ElButton,
        { type: 'primary', ...triggerProps, role: 'trigger' },
        { default: () => [triggerProps?.triggerText, vNode] }
      )
    }

    const rednerButtonGroup = () => {
      const { triggerProps } = props
      return h(
        ElButtonGroup,
        {},
        {
          default: () => [
            renderButton(),
            h(
              ElButton,
              { type: 'primary', ...triggerProps, role: 'icon' },
              {
                default: () => renderIcon(),
              }
            ),
          ],
        }
      )
    }

    const renderTrigger = (option: DropdownOption) => {
      const { splitButton } = props
      if (slots.default) {
        return slots.default(option)
      } else {
        return splitButton
          ? rednerButtonGroup()
          : renderButton(renderIcon({ style: { marginLeft: '8px' } }))
      }
    }

    const hasLabelSlot = computed(() => !!slots.label)

    const recursion = (options: DropdownOption[]) => {
      return options.map((option: DropdownOption) => {
        const newOption = {
          children: [],
          disabled: false,
          divided: false,
          ...option,
        }
        if (hasLabelSlot.value) {
          newOption.renderLabel = (option: DropdownOption) =>
            slots.label?.(option)
        }
        if (option.children) {
          newOption.children = recursion(option.children)
        }
        return newOption
      })
    }

    const userOptions = computed(() => recursion(props.options))

    const options = computed(() => {
      return [
        {
          label: TRIGGER,
          value: TRIGGER,
          children: userOptions.value,
          renderLabel: (option: DropdownOption) => renderTrigger(option),
        },
      ]
    })

    const handleSelect = (value: DropdownValue, valuePath: DropdownValue[]) => {
      emit(
        'change',
        value,
        valuePath.filter((_: DropdownValue) => _ !== TRIGGER)
      )
    }

    return () => {
      return h(Panel, {
        tooltipOptions: {
          offset: 12,
          placement: 'bottom-start',
        },
        ...attrs,
        class: props.splitButton ? ns.m('split-button') : '',
        pure: true,
        options: unref(options),
        onSelect: handleSelect,
      })
    }
  },
})
