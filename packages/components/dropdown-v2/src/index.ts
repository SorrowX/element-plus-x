import { computed, defineComponent, h, unref } from 'vue'
import { dropdownV2Props } from './dropdown-v2'
import Panel from './panel'
import type { DropdownOption, DropdownValue } from './types'

const TRIGGER = 'trigger'

export default defineComponent({
  name: 'ElDropdownV2',
  props: dropdownV2Props,
  setup(props, { attrs, emit, slots }) {
    const options = computed(() => {
      return [
        {
          label: TRIGGER,
          value: TRIGGER,
          children: props.options,
          renderLabel: (option: DropdownOption) => slots.default?.(option),
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
        pure: true,
        options: unref(options),
        onSelect: handleSelect,
      })
    }
  },
})
