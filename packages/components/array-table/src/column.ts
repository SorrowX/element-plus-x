import { defineComponent, h, inject, ref } from 'vue'
import { ElTableColumn } from 'element-plus'
import ArrayBase from '@element-plus/components/array-base'
import { GetKeySymbol, StartIndexSymbol } from './constant'

export default defineComponent({
  name: 'ElArrayTableColumn',
  setup(props, { attrs, slots }) {
    const startIndex = inject(StartIndexSymbol, ref(0))
    const getKey = inject(GetKeySymbol, (index: number) => String(index))

    return () => {
      return h(
        ElTableColumn,
        {
          ...attrs,
        },
        {
          ...slots,
          default: ({ $index, column, row }: any) => {
            const realIndex = startIndex.value + $index
            return h(
              ArrayBase.Item,
              {
                index: realIndex,
                record: row,
                key: getKey($index),
              },
              {
                default: () =>
                  slots.default?.({
                    $index: realIndex,
                    $record: row,
                    index: $index,
                    column,
                    row,
                  }),
              }
            )
          },
        }
      )
    }
  },
})
