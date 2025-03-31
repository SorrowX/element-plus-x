import { computed, h, nextTick, ref } from 'vue'
import { useLocale } from 'element-plus'
import { isFunction } from '@element-plus/utils'
import { DIV_TAG } from '@element-plus/constants'
import LoadMore from '@element-plus/components/load-more'
import type { Ref } from 'vue'

interface LoadFnOptions {
  successCallback?: () => void
  errorCallback?: () => void
  finallyCallback?: () => void
}
type DirectionType = 'top' | 'bottom'

interface Options {
  direction: DirectionType
  handleError?: () => void
}

export const useLoad = (
  props: Record<string, Ref<any>>,
  options: Options = {
    direction: 'bottom',
  }
) => {
  const {
    load,
    preLoad,
    finished,
    loadingText,
    errorText,
    noMoreText,
    infiniteScrollDistance,
  } = props
  const { t } = useLocale()
  const loading = ref(false)
  const error = ref(false)

  const isBottomDirection = options.direction === 'bottom'

  const hasLoad = computed(() =>
    isBottomDirection
      ? load.value && isFunction(load.value)
      : preLoad.value && isFunction(preLoad.value)
  )

  const shouldRenderLoading = computed(
    () => hasLoad.value && loading.value && !error.value && !finished.value
  )
  const shouldRenderError = computed(
    () => hasLoad.value && error.value && !finished.value
  )
  const shouldRenderFinished = computed(() => hasLoad.value && finished.value)

  const calcLoadingText = computed(
    () => loadingText.value ?? t('epx.loadMore.loadingText')
  )
  const calcErrorText = computed(
    () => errorText.value ?? t('epx.loadMore.errorText')
  )
  const calcFinishedText = computed(
    () => noMoreText.value ?? t('epx.loadMore.noMoreText')
  )

  const status = computed(() => {
    let status = ''
    if (shouldRenderLoading.value) {
      status = 'loading'
    }
    if (shouldRenderFinished.value) {
      status = 'noMore'
    }
    if (shouldRenderError.value) {
      status = 'error'
    }
    return status
  })

  const handleLoad = async (
    shouldTrigger: boolean,
    options?: LoadFnOptions
  ) => {
    if (
      shouldTrigger &&
      hasLoad.value &&
      !loading.value &&
      !finished.value &&
      !error.value
    ) {
      try {
        loading.value = true
        error.value = false
        await load.value?.()
        options?.successCallback?.()
      } catch {
        error.value = true
        options?.errorCallback?.()
      } finally {
        loading.value = false
        options?.finallyCallback?.()
      }
    }
  }

  const cache = {
    scrollHeight: 0,
  }
  const recordCache = (target: HTMLDivElement) => {
    cache.scrollHeight = target?.scrollHeight ?? 0
  }
  const fixedScrollbarPosition = (target: HTMLDivElement) => {
    nextTick(() => {
      if (target) {
        const scrollHeight = target.scrollHeight ?? 0
        const oldScrollHeight = cache.scrollHeight
        target.scrollTop = Math.max(scrollHeight - oldScrollHeight, 0)
      }
    })
  }

  const handlePreLoad = async (
    shouldTrigger: boolean,
    target: HTMLDivElement
  ) => {
    if (
      shouldTrigger &&
      hasLoad.value &&
      !loading.value &&
      !finished.value &&
      !error.value
    ) {
      try {
        loading.value = true
        error.value = false
        recordCache(target)
        await preLoad.value?.()
      } catch {
        error.value = true
      } finally {
        loading.value = false
        fixedScrollbarPosition(target)
      }
    }
  }

  const handleClickError = (type: string) => {
    if (type === 'error') {
      loading.value = false
      error.value = false
      options.handleError?.()
    }
  }

  const renderLoadMore = (placeholder: boolean = false) => {
    const loadMoreVNode =
      hasLoad.value && status.value
        ? h(LoadMore, {
            status: status.value,
            loadingText: calcLoadingText.value,
            noMoreText: calcFinishedText.value,
            errorText: calcErrorText.value,
            onClick: handleClickError,
          })
        : ''
    return placeholder && hasLoad.value
      ? h(
          DIV_TAG,
          {
            style: {
              height: '36px',
            },
          },
          [loadMoreVNode]
        )
      : loadMoreVNode
  }

  let preScrollTop = 0
  const isShouldTrigger = (target: HTMLElement) => {
    const { scrollHeight, scrollTop, clientHeight } = target
    if (isBottomDirection) {
      const isDownward = scrollTop > preScrollTop // 向下滚动
      preScrollTop = scrollTop

      const shouldTrigger =
        scrollHeight - (scrollTop + clientHeight) < infiniteScrollDistance.value
      return isDownward && shouldTrigger
    } else {
      return scrollTop === 0
    }
  }

  return {
    handleLoad,
    handlePreLoad,
    renderLoadMore,
    isShouldTrigger,
  }
}
