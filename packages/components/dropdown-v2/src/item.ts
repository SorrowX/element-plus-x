import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  inject,
  unref,
} from 'vue'
import { ElIcon, useNamespace } from 'element-plus'
import { ArrowRight } from '@element-plus/icons-vue'
import { definePropType, isArray, isFunction } from '@element-plus/utils'
import { LI_TAG, SPAN_TAG } from '@element-plus/constants'
import useItem from './use-item'
import type { DropdownOption, PanelProvider } from './types'

export default defineComponent({
  name: 'ElDropdownV2Item',
  props: {
    option: {
      type: definePropType<DropdownOption>(Object),
      required: true,
    },
    showArrowRight: {
      type: Boolean,
      default: false,
    },
    level: {
      type: definePropType<number>(Number),
    },
  },
  setup(props, { attrs, slots }) {
    const ns = useNamespace('dropdown-v2-item')
    const rootPanel = inject<PanelProvider>('rootPanel') as PanelProvider
    const instance = getCurrentInstance()!

    const label = computed(() => props.option.label)
    const value = computed(() => props.option.value)
    const divided = computed(() => !!props.option.divided)
    const disabled = computed(() => !!props.option.disabled)
    const hasChild = computed(
      () => isArray(props.option.children) && props.option.children.length
    )

    const trigger = computed(() => rootPanel.props.trigger)

    const isActive = computed(() =>
      rootPanel.openedItems.includes(unref(value))
    )

    const { valuePath } = useItem(
      instance,
      computed(() => unref(value))
    )

    const handleClick = () => {
      const data = {
        value: unref(value),
        valuePath: unref(valuePath),
      }
      if (!props.option?.disabled && unref(trigger) === 'hover') {
        rootPanel.handleItemClick({ ...data })
      }
      if (
        !props.option?.disabled &&
        unref(trigger) === 'click' &&
        !unref(hasChild)
      ) {
        rootPanel.closeSubItem(data.value, data.valuePath)
        rootPanel.emitSelect({ ...data })
      }
    }

    const renderLabel = () => {
      const { renderLabel } = props.option
      return isFunction(renderLabel)
        ? renderLabel(props.option)
        : [
            h(SPAN_TAG, { class: ns.e('label') }, unref(label)),
            props.showArrowRight
              ? h(
                  ElIcon,
                  { size: 14 },
                  {
                    default: () => h(ArrowRight),
                  }
                )
              : '',
          ]
    }

    return () => {
      return h(
        LI_TAG,
        {
          ...attrs,
          class: [
            ns.b(),
            isActive.value ? ns.m('active') : '',
            divided.value ? ns.m('divided') : '',
            disabled.value ? ns.m('disabled') : '',
          ],
          onClick: handleClick,
        },
        [slots.default ? slots.default() : renderLabel()]
      )
    }
  },
})
