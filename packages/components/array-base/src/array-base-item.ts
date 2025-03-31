import { defineComponent, provide, renderSlot } from 'vue'
import { ItemSymbol } from './constant'

export interface IArrayBaseItemProps {
  index: number
  record: any
}

export const ArrayBaseItem = defineComponent<IArrayBaseItemProps>({
  name: 'ArrayBaseItem',
  props: {
    index: {
      type: Number,
    },
    record: {
      type: null,
    },
  },
  setup(props: IArrayBaseItemProps, { slots }) {
    provide(ItemSymbol, props)

    return () => renderSlot(slots, 'default')
  },
})
