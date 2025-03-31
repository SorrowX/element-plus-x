import { computed, defineComponent, h } from 'vue'
import { useNamespace } from 'element-plus'
import { DIV_TAG } from '@element-plus/constants'
import { flexProps } from './flex'
import { createFlexClassNames, isPresetSize, omit } from './helper'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElFlex',
  inheritAttrs: false,
  props: flexProps,
  setup(props, { attrs, slots }) {
    const ns = useNamespace('flex')
    const prefixCls = ns.b()

    const mergedCls = computed(() => [
      prefixCls,
      createFlexClassNames(prefixCls, props),
      {
        [`${prefixCls}-gap-${props.gap}`]: isPresetSize(props.gap),
        [`${prefixCls}-vertical`]: props.vertical,
      },
    ])
    return () => {
      const {
        flex,
        gap,
        component: Component = DIV_TAG,
        ...othersProps
      } = props

      const mergedStyle: CSSProperties = {}

      if (flex) {
        mergedStyle.flex = flex
      }

      if (gap && !isPresetSize(gap)) {
        mergedStyle.gap = `${gap}px`
      }

      return h(
        Component,
        {
          class: [attrs.class, mergedCls.value],
          style: [attrs.style, mergedStyle],
          ...omit(othersProps, ['justify', 'wrap', 'align', 'vertical']),
        },
        {
          default: () => slots.default?.(),
        }
      )
    }
  },
})
