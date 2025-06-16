import {
  computed,
  defineComponent,
  h,
  reactive,
  ref,
  vShow,
  withDirectives,
} from 'vue'
import { ElEmpty, useNamespace, vLoading } from 'element-plus'
import { DIV_TAG } from '@element-plus/constants'
import { useTablePageConfig } from '@element-plus/components/config-provider-v2'
import EpTable from './table'
import EpPagination from './pagination'
import { tablePageProps } from './table-page'
import type { IQueryParams } from './types'

export default defineComponent({
  name: 'ElTablePage',
  props: {
    ...tablePageProps,
  },
  setup(props, { attrs, slots, expose, emit }) {
    const epTableRef = ref()
    const pageTableRef = ref()
    const headerWrapperRef = ref()
    const tableWrapperRef = ref()
    const footerWrapperRef = ref()

    const ns = useNamespace('table')
    const ROOT_PREFIX = ns.b('page')
    const TABLE_PREFIX = ns.b('wrapper')

    const { tablePageConfig } = useTablePageConfig()

    const pagination = computed(() => {
      return {
        ...tablePageConfig.value.pagination,
        ...props.pagination,
      }
    })
    const firstPageSize = computed(
      () =>
        pagination.value.defaultPageSize ??
        pagination.value.pageSizes?.[0] ??
        10
    )
    const config = computed(() => {
      return {
        ...tablePageConfig.value.config,
        ...props.config,
      }
    })
    const currentPageKey = computed(() => config.value.currentPage)
    const pageSizeKey = computed(() => config.value.pageSize)
    const totalKey = computed(() => config.value.total)
    const isEmpty = computed(
      () => state.loading === false && state.tableData.length === 0
    )

    const state: any = reactive({
      [currentPageKey.value]: 1,
      [pageSizeKey.value]: firstPageSize.value,
      [totalKey.value]: 0,
      loading: false,
      tableData: [],
    })

    // methods
    const query = async (params: IQueryParams = {}) => {
      const currentPageValue =
        params[currentPageKey.value] ?? state[currentPageKey.value]
      const pageSizeValue =
        params[pageSizeKey.value] ?? state[pageSizeKey.value]
      state[currentPageKey.value] = currentPageValue
      state[pageSizeKey.value] = pageSizeValue

      return new Promise((resolve, reject) => {
        state.loading = true
        props?.httpRequest?.({
          params: {
            [currentPageKey.value]: currentPageValue,
            [pageSizeKey.value]: pageSizeValue,
            ...params,
          },
          resolve: ({ list, total }: { list: any; total: number }) => {
            state.loading = false
            state.tableData = list
            state[totalKey.value] = total ?? 0
            emit('data-change', state)
            return resolve(state)
          },
          reject: (e: Error) => {
            state.loading = false
            emit('data-change', state)
            return reject(e)
          },
        })
      })
    }
    if (props.firstInvoke) {
      query()
    }

    const handleSizeChange = (pageSize: number) => {
      state[pageSizeKey.value] = pageSize
      // query()
    }
    const handleCurrentChange = (currentPage: number) => {
      state[currentPageKey.value] = currentPage
      // query()
    }

    const handleChange = () => query()

    // public api
    const request = ({ ...args }) => {
      return query(args)
    }

    const getTable = () => epTableRef.value?.getTable()

    const getState = () => state

    // 获取当前页的数量
    const getCurrentPageCounts = (
      currentPage: number,
      pageSize: number,
      total: number
    ) => {
      const pages = Math.ceil(total / pageSize)
      const prevSize = (currentPage - 1) * pageSize
      return total <= pageSize
        ? total
        : currentPage === pages
        ? total % prevSize
        : pageSize
    }

    // 获取前一页的currentPage(删除操作时，可以调用该方法获取正确的currentPage来调用后端接口)
    const getCurrentPageBySubtract = (count: number) => {
      const currentPageValue = state[currentPageKey.value]
      const counts = getCurrentPageCounts(
        currentPageValue,
        state[pageSizeKey.value],
        state[totalKey.value]
      )
      return Math.max(
        1,
        counts - count > 0 ? currentPageValue : currentPageValue - 1
      )
    }

    const getTableWrapperHeight = () => {
      const pageTable = pageTableRef.value
      const header = headerWrapperRef.value
      const footer = footerWrapperRef.value
      if (pageTable && header && footer) {
        return (
          pageTable.offsetHeight - header.offsetHeight - footer.$el.offsetHeight
        )
      } else {
        return 0
      }
    }

    expose({
      request,
      getTable,
      getState,
      getCurrentPageCounts,
      getCurrentPageBySubtract,
      tableRef: tableWrapperRef,
    })

    return () => {
      const { columns } = props
      const tableWrapperHeight = getTableWrapperHeight()
      const needFixed = tableWrapperHeight > props.boundaryValue

      const pureAttrs = { ...attrs }
      delete pureAttrs.class
      delete pureAttrs.style

      const tableData = {
        height: '100%',
        ...pureAttrs,
        columns,
        data: state.tableData,
        ref: epTableRef,
        key: needFixed || isEmpty.value ? 'true' : 'false',
      }
      // if (needFixed || isEmpty.value) {
      //   ;(tableData as any).height = '100%'
      // }

      const empty = h(ElEmpty, { imageSize: 120, ...pureAttrs }, slots)
      const table = h(EpTable, tableData as any, {
        empty: () => empty,
        ...slots,
      })
      const loadingTable = withDirectives(table, [[vLoading, state.loading]])
      const wrapperTable = h(
        DIV_TAG,
        {
          class: [
            TABLE_PREFIX,
            needFixed || isEmpty.value ? `${TABLE_PREFIX}--fixed` : '',
          ],
          ref: tableWrapperRef,
        },
        [
          slots.table
            ? withDirectives(slots.table({ list: state.tableData })?.[0], [
                [vLoading, state.loading],
              ])
            : loadingTable,
        ]
      )

      const paginationVnode = h(
        EpPagination,
        {
          onSizeChange: handleSizeChange,
          onCurrentChange: handleCurrentChange,
          onChange: handleChange,
          ...pagination.value,
          ref: footerWrapperRef,
          currentPage: state[currentPageKey.value],
          pageSize: state[pageSizeKey.value],
          total: state[totalKey.value],
        },
        slots
      )

      return h(
        DIV_TAG,
        {
          class: ROOT_PREFIX,
          ref: pageTableRef,
        },
        [
          h(
            DIV_TAG,
            {
              class: `${ROOT_PREFIX}__header`,
              ref: headerWrapperRef,
            },
            [slots.header && slots.header()]
          ),
          wrapperTable,
          withDirectives(paginationVnode, [[vShow, props.showPagination]]),
        ]
      )
    }
  },
})
