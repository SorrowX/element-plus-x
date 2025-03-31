import { computed, defineComponent, h, ref } from 'vue'
import { ElRadio, ElTable, ElTableColumn } from 'element-plus'
import type { CI, CRI, ColumnProps } from './types'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'ElTable',
  props: {
    columns: {
      type: Array as PropType<ColumnProps[]>,
      default: () => [],
    },
  },
  setup(props, { attrs, slots, expose }) {
    const rowKey: any = attrs?.['row-key'] ?? attrs?.['rowKey']
    const onRadioSelectionChange: any = attrs?.onRadioSelectionChange
    const tableRef = ref(null)
    const currentSelectRow = ref(null)

    const hasRadioType = computed(() =>
      props.columns.some((column) => column.type === 'radio')
    )
    const radioColumn = computed(() =>
      props.columns.find((column) => column.type === 'radio')
    )
    if (hasRadioType.value && !rowKey) {
      console.error('[ElTablePage]: row-key is required')
    }

    const data = computed(() => {
      const data = (attrs as any)?.data ?? []
      const reserveRadioSelection = radioColumn.value?.reserveRadioSelection
      const currentRow = currentSelectRow.value

      return hasRadioType.value
        ? data.map((row: Record<string, any>) => {
            if (
              !Object.prototype.hasOwnProperty.call(row, '__radioModelValue__')
            ) {
              row.__radioModelValue__ = reserveRadioSelection
                ? currentRow
                  ? currentRow?.[rowKey] === row[rowKey]
                    ? true
                    : false
                  : false
                : false
            }
            return row
          })
        : data
    })

    const clearRadioSelection = () => {
      data.value.forEach((item: any) => {
        item.__radioModelValue__ = false
      })
      currentSelectRow.value = null
    }

    const getRadioSelectionRow = () => currentSelectRow.value

    const toggleRadioRowSelection = (rowData: any, selected: boolean) => {
      const index = data.value.findIndex(
        (_: any) => _[rowKey] === rowData[rowKey]
      )
      if (index !== -1) {
        data.value[index]['__radioModelValue__'] = selected
        if (selected) {
          currentSelectRow.value = data.value[index]
        }
      }
    }

    expose({
      getTable: () => {
        const table = (tableRef as any).value ?? {}
        table.clearRadioSelection = clearRadioSelection
        table.getRadioSelectionRow = getRadioSelectionRow
        table.toggleRadioRowSelection = toggleRadioRowSelection
        return table
      },
    })

    return () => {
      const { columns } = props

      const children = columns.map((column: ColumnProps) => {
        const formatSlots: any = {
          header: (data: CI<any>) => {
            return column?.headerCellRenderer?.(data) ?? data.column.label
          },
        }
        if (!column.formatter) {
          formatSlots.default = (data: CRI<any>) => {
            return (
              column?.cellRenderer?.(data) ??
              data?.row?.[data?.column?.property]
            )
          }
        }
        if (column.type === 'radio') {
          column.width = column.width ?? 50
          column.cellRenderer = ({ row, $index }) => {
            return h(ElRadio, {
              disabled: column.selectable
                ? !column.selectable.call(null, row, $index)
                : false,
              value: true,
              modelValue: row.__radioModelValue__,
              onChange() {
                clearRadioSelection()
                row.__radioModelValue__ = true
                currentSelectRow.value = row
                onRadioSelectionChange && onRadioSelectionChange(row)
              },
            })
          }
        }
        return h(ElTableColumn, { ...column }, formatSlots)
      })
      return h(
        ElTable,
        { ...attrs, ref: tableRef, data: data.value },
        {
          ...slots,
          default: () => children,
        }
      )
    }
  },
})
