import {
  ComputedRef,
  InjectionKey,
  computed,
  defineComponent,
  inject,
  provide,
  shallowRef,
  triggerRef,
  unref,
  watch,
} from 'vue'
import { definePropType } from '@element-plus/utils'
import { BubbleContextProps } from './bubble/bubble'

const BubbleContextKey: InjectionKey<ComputedRef<BubbleContextProps>> =
  Symbol('BubbleContext')

export const globalBubbleContextApi = shallowRef<BubbleContextProps>()

export const useBubbleContextProvider = (
  value: ComputedRef<BubbleContextProps>
) => {
  provide(BubbleContextKey, value)
  watch(
    value,
    () => {
      globalBubbleContextApi.value = unref(value)
      triggerRef(globalBubbleContextApi)
    },
    { immediate: true, deep: true }
  )
}

export const useBubbleContextInject = () => {
  return inject(
    BubbleContextKey,
    computed(() => globalBubbleContextApi.value || {})
  )
}

export const BubbleContextProvider = defineComponent({
  props: {
    value: definePropType<BubbleContextProps>(Object),
  },
  setup(props, { slots }) {
    useBubbleContextProvider(computed(() => props.value || {}))
    return () => {
      return slots.default?.()
    }
  },
})

export default BubbleContextProvider
