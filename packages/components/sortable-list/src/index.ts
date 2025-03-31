import { computed, defineComponent, h, ref } from 'vue'
import { useNamespace } from 'element-plus'
import { useSortable } from '@vueuse/integrations/useSortable'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'

import { sortableListEmits, sortableListProps } from './sortable-list'

export default defineComponent({
  name: 'ElSortableList',
  inheritAttrs: false,
  props: sortableListProps,
  emits: sortableListEmits,
  setup(props, { attrs, slots, emit, expose }) {
    const ns = useNamespace('sortable-list')

    const target = ref<HTMLElement>()

    const list = computed({
      get() {
        return props.modelValue
      },
      set(list) {
        emit(UPDATE_MODEL_EVENT, list)
        emit(CHANGE_EVENT, list)
      },
    })

    const { start, stop, option } = useSortable(target, list, props.options)

    expose({
      start,
      stop,
      option,
    })

    return () => {
      return h(
        props.tag,
        { ref: target, ...attrs, class: [ns.b(), attrs.class] },
        list.value.map((data, index) => slots.default?.({ data, index }))
      )
    }
  },
})
