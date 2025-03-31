import type { PanelProps } from './panel'
import type { Ref, VNode } from 'vue'

export type DropdownValue = string | number

export type RenderLabel = (
  option: DropdownOption
) => VNode | VNode[] | undefined

export interface DropdownOption extends Record<string, unknown> {
  label: string
  value: DropdownValue
  children?: DropdownOption[]
  disabled?: boolean
  divided?: boolean
  renderLabel?: RenderLabel
}

export interface ItemClicked {
  value: DropdownValue
  valuePath: DropdownValue[]
}

export interface PanelProvider {
  openedItems: DropdownValue[]
  activeIndex?: DropdownValue
  openItem: (value: DropdownValue, valuePath: DropdownValue[]) => void
  closeItem: (value: DropdownValue, valuePath: DropdownValue[]) => void
  handleItemClick: (item: ItemClicked) => void
  closeSubItem: (value: DropdownValue, valuePath: DropdownValue[]) => void
  emitSelect: (item: ItemClicked) => void
  props: PanelProps
}

export interface SubItemReturn {
  level: number
  value: DropdownValue
  hide: () => void
}

export interface SubItemProvider {
  mouseInChild: Ref<boolean>
  level: number
  handleMouseleave?: (deepDispatch: boolean) => void
}
