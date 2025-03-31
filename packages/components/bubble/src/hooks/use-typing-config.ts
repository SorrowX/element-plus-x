import { computed } from 'vue'
import { isBoolean, isObject } from '@element-plus/utils'
import type { BubbleProps, TypingOption } from '../bubble/bubble'

function useTypingConfig(props: BubbleProps) {
  const typingEnabled = computed(() => {
    const { typing } = props
    return (isBoolean(typing) && typing) || isObject(typing)
  })

  const baseConfig: Required<TypingOption> = {
    step: 1,
    interval: 50,
    // set default suffix is empty
    suffix: null,
  }
  const config = computed(() => ({
    ...baseConfig,
    ...(typeof props.typing === 'object' ? props.typing : {}),
  }))

  return [
    typingEnabled,
    computed(() => config.value.step),
    computed(() => config.value.interval),
    computed(() => config.value.suffix),
  ] as const
}

export default useTypingConfig
