import { computed, defineComponent, h, provide, ref } from 'vue'
import { ElPagination, useNamespace } from 'element-plus'
import { ElDraggableTable } from '@element-plus/components/draggable-table'
import ArrayBase from '@element-plus/components/array-base'
import { DIV_TAG } from '@element-plus/constants'
import { useField } from '@element-plus/components/array-base/src/hooks'
import { isObject } from '@element-plus/utils'
import { sortHandleKls } from '@element-plus/components/array-base/src/constant'
import { GetKeySymbol, StartIndexSymbol } from './constant'
import type { PaginationProps } from 'element-plus'
import type { Ref } from 'vue'
import type { IFieldContext } from '@element-plus/components/array-base/src/array-base'

export type PaginationType =
  | Pick<PaginationProps, keyof PaginationProps>
  | undefined

export type TableDataType = any[]

export default defineComponent({
  name: 'ElArrayTable',
  props: {
    pagination: {
      type: null,
    },
  },
  setup(props, { attrs, slots }) {
    const ns = useNamespace('array-table')
    const field: IFieldContext = useField()
    const { keyMap, getKey } = ArrayBase.useKey()

    const pagination: PaginationType = props.pagination
    const hasPagination = computed(() => isObject(pagination))
    const paginationProps: Ref<any> = computed(() =>
      hasPagination.value ? pagination : {}
    )

    const dataSource = computed(() =>
      field
        ? Array.isArray(field.fieldValue)
          ? field.fieldValue.slice()
          : []
        : []
    )

    const current = ref(1)
    const total = computed(() => dataSource.value?.length || 0)
    const pageSize = computed(() => paginationProps.value?.pageSize || 10)
    const startIndex = computed(() => (current.value - 1) * pageSize.value)
    const endIndex = computed(() => startIndex.value + pageSize.value - 1)

    provide(StartIndexSymbol, startIndex)
    provide(GetKeySymbol, getKey)

    const data = computed(() =>
      dataSource.value?.slice(startIndex.value, endIndex.value + 1)
    )

    const handleCurrentChange = (currentPage: number) => {
      current.value = currentPage
    }

    const handleSortData = (data: any[], { e }: any) => {
      if (field && Array.isArray(field.fieldValue)) {
        const { oldIndex, newIndex } = e
        const newIdx = newIndex + startIndex.value
        const oldIdx = oldIndex + startIndex.value
        field.fieldValue.splice(
          newIdx,
          0,
          field.fieldValue.splice(oldIdx, 1)[0]
        )
      }
    }

    return () => {
      const renderPagination = () => {
        return [
          h(
            ElPagination,
            {
              background: true,
              layout: 'total, prev, pager, next',
              ...paginationProps.value,
              class: ns.b('pagination'),
              currentPage: current.value,
              pageSize: pageSize.value,
              total: total.value,
              onCurrentChange: handleCurrentChange,
            },
            slots
          ),
        ]
      }

      const paginationVNode = hasPagination.value ? renderPagination() : []

      const renderTable = (data: TableDataType) => {
        return h(
          ArrayBase,
          {
            keyMap,
          },
          {
            default: () => [
              slots?.prepend?.({ field, keyMap, getKey }),
              h(
                ElDraggableTable,
                {
                  ...attrs,
                  data,
                  draggableProps: {
                    handle: sortHandleKls,
                  },
                  onSortData: handleSortData,
                },
                {
                  ...slots,
                  default: () => [slots.default?.({ field, keyMap, getKey })],
                }
              ),
              ...paginationVNode,
              slots?.addition?.({ field, keyMap, getKey }),
            ],
          }
        )
      }

      return h(DIV_TAG, { class: ns.b() }, [renderTable(data.value)])
    }
  },
})
