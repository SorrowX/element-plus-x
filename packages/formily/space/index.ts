// @ts-nocheck

import { defineComponent, SetupContext, h } from 'vue'
import type { VNode } from 'vue'
import { stylePrefix } from '../__builtins__'
import { useFormLayout } from '../form-layout'

export type SpaceProps = {
  size: 'small' | 'middle' | 'large' | number
  direction: 'horizontal' | 'vertical'
  align: 'start' | 'end' | 'center' | 'baseline'
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

export const Space = defineComponent({
  name: 'FSpace',
  props: ['size', 'direction', 'align'],
  setup(props: SpaceProps, { slots }: SetupContext) {
    const layout = useFormLayout()

    return () => {
      const {
        align,
        size = layout.value?.spaceGap ?? 'small',
        direction = 'horizontal',
      } = props

      const prefixCls = `${stylePrefix}-space`
      const children = slots.default?.()

      // 获取子节点数量
      let items: VNode[] = []
      if (Array.isArray(children)) {
        if (children.length === 1) {
          if ((children[0]['tag'] as string)?.endsWith('Fragment')) {
            // Fragment hack
            items = (children[0]['componentOptions'] as { children: VNode[] })
              ?.children
          } else {
            items = children
          }
        } else {
          items = children
        }
      }
      const len = items.length

      if (len === 0) {
        return null
      }

      const mergedAlign =
        align === undefined && direction === 'horizontal' ? 'center' : align
      const marginDirection = 'marginRight' // directionConfig === 'rtl' ? 'marginLeft' : 'marginRight';

      const someSpaceClass = {
        [prefixCls]: true,
        [`${prefixCls}-${direction}`]: true,
        [`${prefixCls}-align-${mergedAlign}`]: mergedAlign,
      }

      const itemClassName = `${prefixCls}-item`

      const renderItems = items.map((child, i) =>
        h(
          'div',
          {
            class: itemClassName,
            key: `${itemClassName}-${i}`,
            style:
              i === len - 1
                ? {}
                : {
                    [direction === 'vertical'
                      ? 'marginBottom'
                      : marginDirection]:
                      typeof size === 'string'
                        ? `${spaceSize[size]}px`
                        : `${size}px`,
                  },
          },
          { default: () => [child] }
        )
      )

      return h('div', { class: someSpaceClass }, { default: () => renderItems })
    }
  },
})

export default Space
