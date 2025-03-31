import { computed, ref, unref } from 'vue'
import { VirtualListProps } from './virtual-list'

export const cacheKey = Symbol('cacheKey')

export const useCache = (props: VirtualListProps) => {
  const map = ref(new Map())

  const size = computed(() =>
    props.direction === 'vertical' ? 'height' : 'width'
  )

  const getDataSize = (entry: ResizeObserverEntry, el: HTMLElement) => {
    const height =
      entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
    const width =
      entry.borderBoxSize?.[0]?.inlineSize ?? entry.contentRect.width

    let marginHeight = 0
    let marginWidth = 0
    const computedStyle = window.getComputedStyle(el)
    marginHeight += Number.parseInt(computedStyle.marginBottom, 10)
    marginWidth += Number.parseInt(computedStyle.marginRight, 10)

    return {
      height: height + marginHeight,
      width: width + marginWidth,
    }
  }

  const setRealSize = (
    i: number,
    el: HTMLElement,
    entry: ResizeObserverEntry
  ) => {
    if (!unref(map).has(i)) {
      unref(map).set(i, getDataSize(entry, el))
    } else {
      const oldDataSize = unref(map).get(i)
      const newDataSize = getDataSize(entry, el)
      if (
        oldDataSize.height !== newDataSize.height ||
        oldDataSize.width !== newDataSize.width
      ) {
        unref(map).set(i, newDataSize)
      }
    }
  }

  const getRealSize = (i: number): number => {
    if (unref(map).has(i)) {
      return unref(map).get(i)[size.value]
    } else {
      return props.itemSize
    }
  }

  return {
    map,
    setRealSize,
    getRealSize,
  }
}
