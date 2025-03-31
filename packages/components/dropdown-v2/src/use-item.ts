import { computed } from 'vue'
import type { ComponentInternalInstance, Ref } from 'vue'
import type { DropdownOption, DropdownValue } from './types'

export default function useItem(
  instance: ComponentInternalInstance,
  currentValue: Ref<DropdownValue>
) {
  const valuePath = computed(() => {
    let parent = instance.parent!
    const path = [currentValue.value]
    while (parent.type.name !== 'ElDropdownV2Panel') {
      const option = parent.props.option
      if (option) {
        path.unshift((option as DropdownOption).value)
      }
      parent = parent.parent!
    }
    return path
  })

  const parentItem = computed(() => {
    let parent = instance.parent
    while (
      parent &&
      !['ElDropdownV2Panel', 'ElDropdownV2SubItem'].includes(parent.type.name!)
    ) {
      parent = parent.parent
    }
    return parent!
  })

  return {
    parentItem,
    valuePath,
  }
}
