import { computed, defineComponent, h, ref, unref, watch } from 'vue'
import { useNamespace } from 'element-plus'
import { useEventCallback, useState } from '@element-plus/hooks'
import { DIV_TAG } from '@element-plus/constants'
import useListData from '../hooks/use-list-data'
import useDisplayData from '../hooks/use-display-data'
import BubbleContextProvider from '../context'
import Bubble from '../bubble'
import { bubbleListProps } from './bubble-list'
import type { BubbleRef } from '../bubble/bubble'

export default defineComponent({
  name: 'ElBubbleList',
  props: bubbleListProps,
  setup(props, { attrs, slots, expose }) {
    const ns = useNamespace('bubble-list')
    const listPrefixCls = ns.b()

    const TOLERANCE = 1
    const listRef = ref<HTMLDivElement>()
    const bubbleRefs = ref<Record<string, BubbleRef>>({})

    const items = computed(() => props.items)

    const mergedData = useListData(items, props.roles)
    const [displayData, onTypingComplete] = useDisplayData(
      mergedData,
      (key) => {
        props.onLastBubbleTypingComplete?.(key)
      }
    )

    const [scrollReachEnd, setScrollReachEnd] = useState(true)
    const [updateCount, setUpdateCount] = useState(0)

    const onInternalScroll = (e: Event) => {
      const target = e.target as HTMLElement

      setScrollReachEnd(
        target.scrollHeight -
          Math.abs(target.scrollTop) -
          target.clientHeight <=
          TOLERANCE
      )
    }

    watch(updateCount, () => {
      if (props.autoScroll && unref(listRef) && unref(scrollReachEnd)) {
        unref(listRef)?.scrollTo({
          top: unref(listRef)?.scrollHeight,
        })
      }
    })

    // Always scroll to bottom when data change
    watch(
      () => unref(displayData).length,
      () => {
        if (props.autoScroll) {
          // New data come, the origin last one is the second last one
          const lastItemKey =
            unref(displayData)[unref(displayData).length - 2]?.key
          const bubbleInst = unref(bubbleRefs)[lastItemKey!]

          // Auto scroll if last 2 item is visible
          if (bubbleInst && bubbleInst.nativeElement) {
            const { top, bottom } =
              bubbleInst.nativeElement.getBoundingClientRect()
            const { top: listTop, bottom: listBottom } = (
              unref(listRef) as any
            ).getBoundingClientRect()

            const isVisible = top < listBottom && bottom > listTop
            if (isVisible) {
              setUpdateCount(unref(updateCount) + 1)
              setScrollReachEnd(true)
            }
          }
        }
      }
    )

    const onBubbleUpdate = useEventCallback<void>(() => {
      if (props.autoScroll) {
        setUpdateCount(unref(updateCount) + 1)
      }
    })

    const context = computed(() => ({
      onUpdate: onBubbleUpdate,
    }))

    expose({
      nativeElement: listRef,
      scrollTo: ({
        key,
        offset,
        behavior = 'smooth',
        block,
      }: {
        offset?: number
        key?: string | number
        behavior?: ScrollBehavior
        block?: ScrollLogicalPosition
      }) => {
        if (typeof offset === 'number') {
          // Offset scroll
          unref(listRef)!.scrollTo({
            top: offset,
            behavior,
          })
        } else if (key !== undefined) {
          // Key scroll
          const bubbleInst = unref(bubbleRefs)[key]

          if (bubbleInst) {
            // Block current auto scrolling
            const index = unref(displayData).findIndex(
              (dataItem) => dataItem.key === key
            )
            setScrollReachEnd(index === unref(displayData).length - 1)

            // Do native scroll
            bubbleInst.nativeElement.scrollIntoView({
              behavior,
              block,
            })
          }
        }
      },
    })

    return () => {
      return h(
        BubbleContextProvider,
        {
          value: context.value,
        },
        {
          default: () => {
            return h(
              DIV_TAG,
              {
                ...attrs,
                class: [
                  ns.b(),
                  scrollReachEnd.value ? `${listPrefixCls}-reach-end` : '',
                ].concat((attrs as any).class),
                ref: listRef,
                onScroll: onInternalScroll,
              },
              unref(displayData).map(({ key, ...bubble }) => {
                return h(
                  Bubble,
                  {
                    ...bubble,
                    key,
                    ref: (node: BubbleRef) => {
                      if (node) {
                        bubbleRefs.value[key] = node
                      } else {
                        delete bubbleRefs.value[key]
                      }
                    },
                    onTypingComplete: () => {
                      bubble.onTypingComplete?.()
                      onTypingComplete(key)
                    },
                  },
                  slots
                )
              })
            )
          },
        }
      )
    }
  },
})
