import { computed, defineComponent, h, ref } from 'vue'
import { useNamespace, useZIndex } from 'element-plus'
import { useFullscreen } from '@vueuse/core'
import { DIV_TAG } from '@element-plus/constants'
import { fullScreenEmits, fullScreenProps } from './full-screen'
import Teleport from './teleport.vue'
import { useWindowFullscreen } from './hooks'
import type { FullScreenType } from './full-screen'

const WINDOW_TYPE = 'window'
const BROWSER_TYPE = 'browser'

export default defineComponent({
  name: 'ElFullScreen',
  inheritAttrs: false,
  props: fullScreenProps,
  emits: fullScreenEmits,
  setup(props, { attrs, slots, expose }) {
    const ns = useNamespace('full-screen')

    const fullType = ref()
    const target = ref<HTMLElement>()
    const teleportEl = ref<HTMLDivElement>()

    const browserReturn = useFullscreen(target)
    const windowReturn = useWindowFullscreen()

    const { nextZIndex } = useZIndex()
    const zIndex = ref(nextZIndex())

    const transferTo = computed(() =>
      fullType.value === WINDOW_TYPE && isFullscreen.value ? 'body' : ''
    )
    const isBrowser = computed(() => fullType.value === BROWSER_TYPE)

    const wrapKlass = computed(() => {
      return {
        [ns.m('full')]: fullType.value === WINDOW_TYPE && isFullscreen.value,
      }
    })

    const setType = (type: FullScreenType) => {
      type = type ?? props.type ?? WINDOW_TYPE
      fullType.value = type !== WINDOW_TYPE ? BROWSER_TYPE : WINDOW_TYPE
    }

    const enter = async (type: FullScreenType) => {
      setType(type)
      zIndex.value = nextZIndex()
      isBrowser.value ? browserReturn.enter() : windowReturn.enter()
    }

    const exit = async (type: FullScreenType) => {
      setType(type)
      zIndex.value = nextZIndex()
      isBrowser.value ? browserReturn.exit() : windowReturn.exit()
    }

    const toggle = async (type: FullScreenType) => {
      setType(type)
      zIndex.value = nextZIndex()
      isBrowser.value ? browserReturn.toggle() : windowReturn.toggle()
    }

    const isFullscreen = computed(() =>
      isBrowser.value
        ? browserReturn.isFullscreen.value
        : windowReturn.isFullscreen.value
    )

    expose({
      enter,
      exit,
      toggle,
      isFullscreen,
      appendTo: teleportEl,
    })

    return () => {
      return h(
        Teleport,
        {
          to: transferTo.value,
        },
        {
          default: () =>
            h(
              props.tag,
              {
                ...attrs,
                ref: target,
                class: [ns.b(), attrs.class, wrapKlass.value],
                style: {
                  ...(attrs.style ?? {}),
                  zIndex: zIndex.value,
                },
              },
              [
                slots.default?.({
                  enter,
                  exit,
                  toggle,
                  isFullscreen,
                  appendTo: teleportEl.value,
                }),
                h(DIV_TAG, {
                  ref: teleportEl,
                  role: 'none',
                  class: ns.e('teleport'),
                }),
              ]
            ),
        }
      )
    }
  },
})
