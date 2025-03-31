import { computed, unref, watch } from 'vue'
import { useState } from '@element-plus/hooks'
import { isString } from '@element-plus/utils'
import type { Ref, VNode } from 'vue'

/**
 * Return typed content and typing status when typing is enabled.
 * Or return content directly.
 */
const useTypedEffect = (
  content: Ref<VNode | object | string>,
  typingEnabled: Ref<boolean>,
  typingStep: Ref<number>,
  typingInterval: Ref<number>
): [typedContent: Ref<VNode | string>, isTyping: Ref<boolean>] => {
  const [prevContent, setPrevContent] = useState<VNode | object | string>('')
  const [typingIndex, setTypingIndex] = useState<number>(1)

  const mergedTypingEnabled = computed(
    () => typingEnabled.value && isString(content.value)
  )

  // Reset typing index when content changed
  watch(content, () => {
    const prevContentValue = unref(prevContent)
    setPrevContent(content.value)
    if (!mergedTypingEnabled.value && isString(content.value)) {
      setTypingIndex(content.value.length)
    } else if (
      isString(content.value) &&
      isString(prevContentValue) &&
      content.value.indexOf(prevContentValue) !== 0
    ) {
      setTypingIndex(1)
    }
  })

  // Start typing
  watch(
    [typingIndex, typingEnabled, content],
    (newValue, oldValue, onCleanup) => {
      if (
        mergedTypingEnabled.value &&
        isString(content.value) &&
        unref(typingIndex) < content.value.length
      ) {
        const id = setTimeout(() => {
          setTypingIndex(unref(typingIndex) + typingStep.value)
        }, typingInterval.value)

        onCleanup(() => {
          clearTimeout(id)
        })
      }
    },
    { immediate: true }
  )

  const mergedTypingContent = computed(() => {
    return mergedTypingEnabled.value && isString(content.value)
      ? content.value.slice(0, unref(typingIndex))
      : (content.value as any)
  })

  return [
    mergedTypingContent,
    computed(
      () =>
        mergedTypingEnabled.value &&
        isString(content.value) &&
        unref(typingIndex) < content.value.length
    ),
  ]
}

export default useTypedEffect
