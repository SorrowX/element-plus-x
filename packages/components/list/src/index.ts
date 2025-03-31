import { defineComponent, h, nextTick, onMounted, ref, toRefs } from 'vue'
import { ElScrollbar, useNamespace } from 'element-plus'
import { DIV_TAG } from '@element-plus/constants'
import { throttle } from '@element-plus/utils'
import { listEmits, listProps } from './list'
import { useLoad } from './hooks'
import type { ItemType } from './list'

export default defineComponent({
  name: 'ElList',
  inheritAttrs: false,
  props: listProps,
  emits: listEmits,
  setup(props, { attrs, slots, expose }) {
    const ns = useNamespace('list')

    const target = ref<HTMLDivElement>()
    const scrollbarRef = ref()

    const { handleLoad, renderLoadMore, isShouldTrigger } = useLoad(
      toRefs(props),
      {
        direction: 'bottom',
        handleError: () => handleLoad(true),
      }
    )

    const {
      handlePreLoad,
      renderLoadMore: renderLoadMoreTop,
      isShouldTrigger: isShouldTriggerTop,
    } = useLoad(toRefs(props), {
      direction: 'top',
      handleError: () => handlePreLoad(true, target.value as HTMLDivElement),
    })

    const onThrottleScroll = throttle(() => {
      handleLoad(isShouldTrigger(target.value as HTMLDivElement))
      handlePreLoad(
        isShouldTriggerTop(target.value as HTMLDivElement),
        target.value as HTMLDivElement
      )
    }, props.infiniteScrollDelay)

    const handleScroll = () => {
      onThrottleScroll()
    }

    const initTarget = () => {
      if (!props.nativeScrollbar) {
        target.value = scrollbarRef.value.wrapRef
      }
    }

    onMounted(() => {
      initTarget()
    })

    const scrollToBottom = () => {
      nextTick(() => {
        const content = target.value
        if (content) {
          content.scrollTop = content.scrollHeight - content.clientHeight
        }
      })
    }

    expose({
      target,
      scrollToBottom,
    })

    return () => {
      const { nativeScrollbar } = props

      const renderChild = () => {
        const list = h(
          DIV_TAG,
          { class: ns.b('wrap') },
          props.list.map((item: ItemType, index: number) => {
            return slots.default?.({ data: item, index })
          })
        )
        return [renderLoadMoreTop(true), list, renderLoadMore()]
      }

      const data = {
        ...attrs,
        class: [ns.b(), attrs.class, nativeScrollbar ? ns.m('scrollbar') : ''],
        ref: nativeScrollbar ? target : scrollbarRef,
        onScroll: handleScroll,
      }

      return nativeScrollbar
        ? h(DIV_TAG, data, [...renderChild()])
        : h(ElScrollbar, data, {
            default: () => renderChild(),
          })
    }
  },
})
