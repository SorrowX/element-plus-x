import { defineComponent, h, nextTick } from 'vue'
import { ElTable, useNamespace } from 'element-plus'
import { UseSortable } from '@vueuse/integrations/useSortable/component'
import { moveArrayElement } from '@vueuse/integrations/useSortable'
import { isArray } from '@element-plus/utils'
import { draggableTableProps } from './draggable-table'
import type { VNode } from 'vue'

const ElTableComp: any = { ...ElTable }

const SORT_DATA_EVENT = 'sort-data'

// 重写 TableBody render 函数
const TableBody = {
  ...ElTableComp.components.TableBody,
  render() {
    const { wrappedRowRender, store } = this
    const data = store.states.data.value || []

    const tableIns = this.context
    const { draggableProps, disabled } = tableIns.props

    const options = {
      animation: 300,
      ...draggableProps,
      onUpdate: (e: any) => {
        const { oldIndex, newIndex } = e
        // update list
        if (isArray(store.states.data.value)) {
          moveArrayElement(store.states.data, oldIndex, newIndex, e)
          nextTick(() => {
            const newData = store.states.data.value
            store.commit('setData', newData)
            tableIns.emit(SORT_DATA_EVENT, newData, { e })
          })
        }
      },
    }

    const renderChildren = () =>
      data.reduce((acc: VNode[], row: any) => {
        return acc.concat(wrappedRowRender(row, acc.length))
      }, [])

    // disabled如果用于options选项中，只会在初始化中生效
    return disabled
      ? h('tbody', { tabIndex: -1 }, [renderChildren()])
      : h(
          UseSortable,
          { options, tag: 'tbody', tabIndex: -1, modelValue: [] },
          {
            default: () => renderChildren(),
          }
        )
  },
}

const ElTableClone = {
  ...ElTableComp,
  name: 'ElTableClone',
  components: { ...ElTableComp.components, TableBody },
  emits: [...ElTableComp.emits, SORT_DATA_EVENT],
  props: {
    ...ElTableComp.props,
    ...draggableTableProps,
  },
}

const ElDraggableTable = defineComponent({
  name: 'ElDraggableTable',
  setup(props, { slots, attrs }) {
    const ns = useNamespace('draggable-table')

    return () =>
      h(
        ElTableClone,
        {
          ...attrs,
          class: ns.b(),
        },
        slots
      )
  },
})

export default ElDraggableTable
