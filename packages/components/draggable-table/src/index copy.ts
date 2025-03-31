import { h } from 'vue'
import draggable from 'vuedraggable'
import { ElTable } from 'element-plus'
import { draggableTableProps } from './draggable-table'

const ElTableComp: any = { ...ElTable }

const SORT_DATA_EVENT = 'sort-data'

// 重写 TableBody render 函数
const TableBody = {
  ...ElTableComp.components.TableBody,
  render() {
    const { wrappedRowRender, store } = this
    const data = store.states.data.value || []

    const tableIns = this.context
    const { rowKey, draggableProps } = tableIns.props
    const draggableData = {
      modelValue: data,
      itemKey: rowKey,
      tag: 'tbody',
      animation: 500,
      'onUpdate:modelValue': function (newData: any) {
        store.commit('setData', newData)
        tableIns.emit(SORT_DATA_EVENT, newData)
      },
    }
    return h(
      draggable,
      { tabIndex: -1, ...draggableData, ...draggableProps },
      {
        item: (data: any) => {
          const row = data.element
          const index = data.index
          return wrappedRowRender(row, index)
        },
      }
    )
  },
}

const ElDraggableTable = {
  ...ElTableComp,
  name: 'ElDraggableTable',
  components: { ...ElTableComp.components, TableBody },
  emits: [...ElTableComp.emits, SORT_DATA_EVENT],
  props: {
    ...ElTableComp.props,
    ...draggableTableProps,
  },
}

export default ElDraggableTable
