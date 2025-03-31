import { computed, unref, watch } from 'vue'
import { useEventCallback, useState } from '@element-plus/hooks'
import { ListItemType } from './use-list-data'
import type { Ref } from 'vue'

type UseDisplayDataReturn = [
  Ref<ListItemType[]>,
  (value: string | number) => void
]

export default function useDisplayData(
  items: Ref<ListItemType[]>,
  displayListLastItemTypingComplete?: (key: string | number) => void
): UseDisplayDataReturn {
  const [displayCount, setDisplayCount] = useState(items.value.length)

  const displayList = computed(() => {
    return items.value.slice(0, unref(displayCount))
  })

  const displayListLastKey = computed(() => {
    const lastItem = unref(displayList)[unref(displayList).length - 1]
    return lastItem ? lastItem.key : null
  })

  // When `items` changed, we replaced with latest one
  watch(
    items,
    () => {
      if (
        unref(displayList).length &&
        unref(displayList).every(
          (item, index) => item.key === items.value[index]?.key
        )
      ) {
        return
      }

      if (unref(displayList).length === 0) {
        setDisplayCount(1)
      } else {
        // Find diff index
        for (let i = 0; i < unref(displayList).length; i += 1) {
          if (unref(displayList)[i].key !== items.value[i]?.key) {
            setDisplayCount(i)
            break
          }
        }
      }
    },
    { immediate: true, deep: true }
  )

  // Continue to show if last one finished typing
  const onTypingComplete = useEventCallback((key: string | number) => {
    if (key === unref(displayListLastKey)) {
      setDisplayCount(unref(displayCount) + 1)
      displayListLastItemTypingComplete?.(key)
    }
  })

  return [displayList, onTypingComplete] as const
}
