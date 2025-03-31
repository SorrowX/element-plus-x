import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  provide,
  ref,
  unref,
} from 'vue'
import { ElTooltip, useNamespace } from 'element-plus'
import { useTimeoutFn } from '@vueuse/core'
import { addUnit, definePropType } from '@element-plus/utils'
import { DIV_TAG, UL_TAG } from '@element-plus/constants'
import Item from './item'
import useItem from './use-item'
import type { DropdownOption, PanelProvider, SubItemProvider } from './types'

const fallbackPlacements = [
  'right-start',
  'right',
  'right-end',
  'left-start',
  'bottom-start',
  'bottom-end',
  'top-start',
  'top-end',
]

export default defineComponent({
  name: 'ElDropdownV2SubItem',
  props: {
    option: {
      type: definePropType<DropdownOption>(Object),
      required: true,
    },
    level: {
      type: definePropType<number>(Number),
    },
  },
  setup(props, { slots, expose }) {
    const ns = useNamespace('dropdown-v2')
    const instance = getCurrentInstance()!

    const value = computed(() => props.option.value)

    const { valuePath, parentItem } = useItem(
      instance,
      computed(() => unref(value))
    )
    const mouseInChild = ref(false)

    const rootPanel = inject<PanelProvider>('rootPanel') as PanelProvider
    const subItem = inject<SubItemProvider>(
      `subItem:${parentItem.value!.uid}`
    ) as SubItemProvider

    const vPopper = ref<InstanceType<typeof ElTooltip> | null>(null)

    const isFirstLevel = computed(() => subItem.level === 0)

    const appendToBody = computed(() => (isFirstLevel.value ? true : false))

    const currentPlacement = computed(() => {
      const tooltipOptions = rootPanel.props.tooltipOptions
      return isFirstLevel.value
        ? tooltipOptions?.placement ?? 'right-start'
        : 'right-start'
    })

    const trigger = computed(() => rootPanel.props.trigger)

    const tooltipOptions = computed(() => {
      return isFirstLevel.value ? rootPanel.props.tooltipOptions ?? {} : {}
    })

    const subMenuShowTimeout = computed(
      () => rootPanel.props.showTimeout ?? 200
    )

    const subMenuHideTimeout = computed(
      () => rootPanel.props.hideTimeout ?? 200
    )

    const opened = computed(() => rootPanel.openedItems.includes(unref(value)))

    const panelStyle = computed(() => {
      return {
        width: addUnit(rootPanel.props.width),
      }
    })

    let timeout: (() => void) | undefined
    const handleMouseenter = (
      event: MouseEvent | FocusEvent,
      showTimeout = subMenuShowTimeout.value
    ) => {
      if (unref(trigger) !== 'hover') return
      subItem.mouseInChild.value = true

      timeout?.()
      ;({ stop: timeout } = useTimeoutFn(() => {
        rootPanel.openItem(unref(value), valuePath.value)
      }, showTimeout))

      if (isFirstLevel.value) {
        parentItem.value.vnode.el?.dispatchEvent(new MouseEvent('mouseenter'))
      }
    }

    const handleMouseleave = (deepDispatch = false) => {
      if (unref(trigger) !== 'hover') return
      subItem.mouseInChild.value = false
      timeout?.()
      ;({ stop: timeout } = useTimeoutFn(() => {
        !mouseInChild.value &&
          rootPanel.closeItem(unref(value), valuePath.value)
      }, subMenuHideTimeout.value))

      if (isFirstLevel.value && deepDispatch) {
        subItem.handleMouseleave?.(true)
      }
    }

    const hide = () => vPopper.value?.hide?.()

    provide<SubItemProvider>(`subItem:${instance.uid}`, {
      handleMouseleave,
      mouseInChild,
      level: subItem.level + 1,
    })

    expose({
      hide,
      level: props.level,
      value: unref(value),
    })

    return () => {
      const data: any = {
        ref: vPopper,
        visible: opened.value,
        effect: 'light',
        pure: true,
        offset: 0,
        showArrow: false,
        persistent: true,
        placement: currentPlacement.value,
        teleported: appendToBody.value,
        fallbackPlacements,
        transition: `${ns.namespace.value}-zoom-in-top`,
        gpuAcceleration: false,
        ...tooltipOptions.value,
      }

      if (unref(trigger) === 'click') {
        delete data.visible
        data.trigger = 'click'
      }

      return h(ElTooltip, data, {
        content: () =>
          h(
            UL_TAG,
            {
              class: ns.b('list'),
              style: panelStyle.value,
              onMouseenter: (evt: MouseEvent) => handleMouseenter(evt, 100),
              onMouseleave: () => handleMouseleave(true),
            },
            [slots.default?.()]
          ),
        default: () =>
          h(
            DIV_TAG,
            {
              onMouseenter: handleMouseenter,
              onMouseleave: () => handleMouseleave(),
            },
            [
              props.option.renderLabel
                ? props.option.renderLabel({ ...props.option })
                : h(Item, {
                    showArrowRight: true,
                    option: props.option,
                    onMouseenter: handleMouseenter,
                    onMouseleave: () => handleMouseleave(),
                  }),
            ]
          ),
      })
    }
  },
})
