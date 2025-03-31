import {
  computed,
  defineComponent,
  h,
  onMounted,
  provide,
  ref,
  toRefs,
} from 'vue'
import { useNamespace } from 'element-plus'
import { useVirtualList } from '@vueuse/core'
import { DIV_TAG } from '@element-plus/constants'
import { isFunction, isObject, throttle } from '@element-plus/utils'
import { useLoad } from '@element-plus/components/list/src/hooks'
import { cacheKey, useCache } from './hooks'
import { virtualListEmits, virtualListProps } from './virtual-list'
import Scrollbar from './scrollbar'
import Item from './item'

export default defineComponent({
  name: 'ElVirtualList',
  inheritAttrs: false,
  props: virtualListProps,
  emits: virtualListEmits,
  setup(props, { attrs, slots, expose, emit }) {
    const ns = useNamespace('virtual-list')

    const propsRefs = toRefs(props)
    const { list: listRef } = propsRefs
    const { direction, overscan } = props

    const scrollbarRef = ref()
    const { isShouldTrigger, handleLoad, renderLoadMore } = useLoad(propsRefs, {
      direction: 'bottom',
      handleError: () => {
        handleLoad(true, {
          finallyCallback: updateRenderList,
        })
      },
    })

    const cache = useCache(props)
    provide(cacheKey, cache)

    const isDynamicSize = computed(() => !props.itemFixed)

    const createItemSize = () => {
      return isDynamicSize.value
        ? (i: number) => cache.getRealSize(i)
        : props.itemSize
    }
    const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(
      listRef,
      {
        [direction === 'vertical' ? 'itemHeight' : 'itemWidth']:
          createItemSize(),
        overscan,
      } as any
    )

    // force update to trigger re-render list
    const updateRenderList = () => {
      const container = containerProps.ref.value
      if (container) {
        const offset = direction === 'vertical' ? 'scrollTop' : 'scrollLeft'
        container[offset] += 1
      }
    }

    const handleInfiniteScroll = (shouldTrigger: boolean) => {
      if (
        isFunction(props.infiniteScroll) &&
        !props.infiniteScrollDisabled &&
        shouldTrigger
      ) {
        props.infiniteScroll?.()
      }
    }

    const handleInfiniteScrollup = async (e: Event) => {
      const { scrollTop } = e.target as HTMLElement
      const shouldTrigger = scrollTop < props.infiniteScrollDistance
      if (
        isFunction(props.infiniteScrollup) &&
        !props.infiniteScrollDisabled &&
        shouldTrigger
      ) {
        let firstData = null
        try {
          firstData = listRef.value[0]
          await props.infiniteScrollup?.()
        } catch {
        } finally {
          const index = listRef.value.indexOf(firstData)
          if (index !== -1) {
            scrollTo(index)
          }
        }
      }
    }

    const onThrottleScroll = throttle((e: Event) => {
      const shouldTrigger = isShouldTrigger(e.target as HTMLElement)
      handleLoad(shouldTrigger, {
        finallyCallback: updateRenderList,
      })
      handleInfiniteScroll(shouldTrigger)
      handleInfiniteScrollup(e)
    }, props.infiniteScrollDelay)

    const { onScroll } = containerProps

    const handleScroll = (e: Event) => {
      emit('scroll', e)
      onScroll()
      onThrottleScroll(e)
    }

    const initContainerRef = () => {
      if (!props.nativeScrollbar) {
        containerProps.ref.value = scrollbarRef.value.wrapRef
      }
    }

    onMounted(() => {
      initContainerRef()
    })

    expose({
      scrollTo,
    })

    return () => {
      const renderContent = () =>
        h(
          DIV_TAG,
          {
            style: {
              ...wrapperProps.value.style,
            },
            class: ns.b('wrapper'),
          },
          list.value.map((item) => {
            const { data, index } = item
            return h(
              Item,
              { data, isDynamicSize: isDynamicSize.value, key: index, index },
              {
                default: () => slots.default?.(item),
              }
            )
          })
        )

      const renderChild = () => {
        return [
          h(DIV_TAG, { class: ns.b('before') }, slots.before?.()),
          renderContent(),
          renderLoadMore(),
          h(DIV_TAG, { class: ns.b('after') }, slots.after?.()),
        ]
      }

      return props.nativeScrollbar
        ? h(
            DIV_TAG,
            {
              class: [ns.b(), attrs.class],
              style: {
                ...(attrs.style ?? {}),
                ...(isObject(containerProps.style) ? containerProps.style : {}),
              },
              ref: containerProps.ref,
              onScroll: handleScroll,
            },
            renderChild()
          )
        : h(
            Scrollbar,
            {
              ref: scrollbarRef,
              class: [ns.b(), attrs.class],
              style: attrs.style,
              wrapOptions: {
                style: {
                  ...(isObject(containerProps.style)
                    ? containerProps.style
                    : {}),
                },
                onScroll: handleScroll,
              },
            },
            {
              default: () => renderChild(),
            }
          )
    }
  },
})
