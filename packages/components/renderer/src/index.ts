import { defineComponent, renderSlot } from 'vue'

import { rendererProps } from './renderer'

export default defineComponent({
  name: 'ElRenderer',
  props: rendererProps,
  setup(props, { slots }) {
    return () => {
      if (typeof props.renderer !== 'function') {
        return renderSlot(slots, 'default', props.data)
      }

      return props.renderer?.(props.data)
    }
  },
})
