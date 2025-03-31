import {
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  renderSlot,
} from 'vue'
import { definePropType, throttle } from '@element-plus/utils'
import { useResize } from '@element-plus/hooks'
import { cacheKey } from './hooks'

export default defineComponent({
  name: 'Item',
  inheritAttrs: false,
  props: {
    index: {
      type: Number,
    },
    data: {
      type: definePropType<Record<string, any>>(Object),
      default: () => ({}),
    },
    isDynamicSize: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const cache: any = inject(cacheKey)

    const { observeResize, unobserveResize } = useResize()

    const instance = getCurrentInstance()

    const getEl = () => {
      const el = instance?.proxy?.$el as Element | null
      if (
        el?.nextElementSibling &&
        el.nextElementSibling !== el.nextSibling &&
        el.nodeType === 3 &&
        el.nodeValue !== ''
      ) {
        return null
      } else {
        return el?.nextElementSibling ?? null
      }
    }

    let observed = false

    const setRealSize = (entry: ResizeObserverEntry) => {
      if (props.isDynamicSize) {
        const el = getEl()
        cache.setRealSize(props.index, el, entry)
      }
    }

    function handleResize(entry: ResizeObserverEntry) {
      setRealSize(entry)
    }

    const throttleResize = throttle(handleResize, 100)

    function observe() {
      if (observed) return

      const el = getEl()

      if (el) {
        observeResize(el, throttleResize)
        observed = true
      }
    }

    function unobserve() {
      if (observed) {
        const el = getEl()

        if (el) {
          unobserveResize(el)
        }

        observed = false
      }
    }

    onMounted(() => {
      observe()
    })

    onBeforeUnmount(() => {
      unobserve()
    })

    return () => renderSlot(slots, 'default')
  },
})
