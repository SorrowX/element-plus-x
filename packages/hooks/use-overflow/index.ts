import { onBeforeUnmount, ref, watch } from 'vue'
import { throttle } from '@element-plus/utils'
import type { Ref } from 'vue'

export type OverflowOptions = {
  selectors: string
  condition?: (contentWidth: number, containerWidth: number) => boolean
}

const CHECK_INTERVAL = 50

export const useOverflow = (
  containerRef: Ref<HTMLElement | undefined>,
  options: OverflowOptions
) => {
  const overflow = ref(false)
  let resizeObserver: ResizeObserver | null
  let mutationObserver: MutationObserver | null

  const defaultCondition = (contentWidth: number, containerWidth: number) =>
    contentWidth > containerWidth

  const condition = options?.condition ?? defaultCondition

  const cleanup = () => {
    if (mutationObserver) {
      mutationObserver.disconnect()
      mutationObserver = null
    }

    if (resizeObserver && containerRef.value) {
      resizeObserver.unobserve(containerRef.value)
      resizeObserver = null
    }
  }

  const observer = () => {
    const container = containerRef.value
    const containerWidth = container?.getBoundingClientRect().width
    const content = container?.querySelector(options.selectors)
    const contentWidth = content?.getBoundingClientRect().width

    if (contentWidth && containerWidth && containerWidth !== 0) {
      overflow.value = condition(contentWidth, containerWidth) ? true : false
    }
  }

  const stopWatch = watch(
    () => containerRef.value,
    (el: any) => {
      cleanup()

      if (el) {
        resizeObserver = new ResizeObserver(observer)
        resizeObserver.observe(el)

        mutationObserver = new MutationObserver(
          throttle(observer, CHECK_INTERVAL)
        )
        // mutationObserver = new MutationObserver(observer)
        mutationObserver.observe(el, { childList: true, subtree: true })
        observer()
      }
    },
    { immediate: true, flush: 'post' }
  )

  onBeforeUnmount(() => {
    cleanup()
    stopWatch()
  })

  return {
    overflow,
    observer,
    cleanup,
    stopWatch,
  }
}
