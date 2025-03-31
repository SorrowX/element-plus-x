import { computed, defineComponent, h } from 'vue'
import { ElPagination, useLocale, useNamespace } from 'element-plus'
import { DIV_TAG, SPAN_TAG } from '@element-plus/constants'
import EpAffixBottom from '@element-plus/components/affix-bottom'

export default defineComponent({
  name: 'EpPagination',
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const { t } = useLocale()
    const ns = useNamespace('pagination-wrapper')
    const ROOT_PREFIX = ns.b()

    const totalPageSize = computed(() => {
      return Math.ceil((attrs as any).total / (attrs as any).pageSize)
    })
    const total = computed(() => {
      return attrs.total
    })

    const singlePage = computed(() => {
      const total: any = attrs.total
      const pageSize: any = attrs.pageSize
      return total <= pageSize
    })

    return () => {
      // 只有一页数据时去掉jumper
      const paginationData = { ...attrs }
      if (singlePage.value) {
        const layout: any = paginationData.layout
        paginationData.layout = layout.replace(', jumper', '')
      }

      const paginationVNode = h(ElPagination, paginationData, slots)

      const totalPageSizeVNode = h(
        SPAN_TAG,
        {
          class: `${ROOT_PREFIX}__total`,
        },
        t('epx.tablePage.totalPageSize', { totalPageSize: totalPageSize.value })
      )

      const recordVNode = h(
        SPAN_TAG,
        {
          class: `${ROOT_PREFIX}__record`,
        },
        t('epx.tablePage.total', { total: total.value as number })
      )

      const wrapperVNode = h(DIV_TAG, { class: ROOT_PREFIX }, [
        h(
          DIV_TAG,
          { class: `${ROOT_PREFIX}__left` },
          attrs.showRecord ? [recordVNode] : []
        ),
        h(DIV_TAG, { class: `${ROOT_PREFIX}__right` }, [
          attrs.showTotal ? totalPageSizeVNode : '',
          paginationVNode,
        ]),
      ])

      return h(
        EpAffixBottom,
        {
          style: {
            position: 'static',
          },
        },
        {
          default: () => [wrapperVNode],
        }
      )
    }
  },
})
