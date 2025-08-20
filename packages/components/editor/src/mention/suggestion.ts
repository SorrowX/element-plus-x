import { computed, h, ref, watchEffect } from 'vue'
import { ElTooltip, useNamespace } from 'element-plus'
import { VueRenderer } from '@tiptap/vue-3'
import { Editor } from '@tiptap/core'
import { SuggestionKeyDownProps, SuggestionProps } from '@tiptap/suggestion'
import { SuggestionOptions } from '../types'
import { filterOption } from '../helper'
import MentionList from './mention-list.vue'

const Popup = {
  name: 'Popup',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    clientRect: {
      type: Function,
      required: true,
    },
    slots: {
      type: Object,
    },
    hiddenPopup: {
      type: Function,
      required: true,
    },
  },
  setup(props: any, { attrs, expose }: any) {
    const ns = useNamespace('editor-popup')

    const listRef = ref()

    const innerVisible = ref(false)

    watchEffect(() => {
      innerVisible.value = props.visible
    })

    const virtualRef = computed(() => {
      return {
        getBoundingClientRect: props.clientRect,
      }
    })

    const onKeyDown = (props: SuggestionProps) => {
      return listRef.value?.onKeyDown?.(props)
    }

    expose({
      onKeyDown,
    })

    return () => {
      return h(
        ElTooltip,
        {
          showArrow: false,
          placement: 'bottom-start',
          ...attrs,
          Key: props.visible,
          effect: 'light',
          trigger: 'click',
          popperClass: ns.b(),
          virtualTriggering: true,
          visible: props.visible,
          virtualRef: virtualRef.value,
        },
        {
          content: () => {
            return h(
              MentionList,
              {
                items: attrs.items,
                command: attrs.command,
                ref: listRef,
                hiddenPopup: props.hiddenPopup,
              },
              {
                ...props.slots,
              }
            )
          },
        }
      )
    }
  },
}

export const useSuggestion = (opts: SuggestionOptions) => {
  const visible = ref<boolean>(false)
  let component: InstanceType<typeof VueRenderer>

  const hiddenPopup = () => {
    if (component) {
      visible.value = false
      component.updateProps({
        visible: visible.value,
      })
    }
  }

  const destroy = () => {
    hiddenPopup()
    component && component.destroy()
  }

  const getVisible = () => visible.value

  const suggestion = {
    char: opts?.char ?? '@',

    allowedPrefixes: null,

    items: ({ query }: { query: string; editor: Editor }) => {
      const { options } = opts

      const getOptions =
        typeof options === 'function' ? options : () => Promise.resolve(options)

      return getOptions({ query })
        .then((options) => {
          const filter = opts.filterOption ?? filterOption
          return options.filter((option) => filter(query, option))
        })
        .catch(() => [])
    },

    render: () => {
      return {
        onStart: (props: SuggestionProps) => {
          if (!props.clientRect) {
            return
          }

          visible.value = true
          component = new VueRenderer(Popup, {
            props: {
              ...props,
              visible: visible.value,
              slots: opts.slots ?? {},
              hiddenPopup,
            },
            editor: props.editor,
          })
        },

        onUpdate(props: SuggestionProps) {
          if (!props.clientRect) {
            return
          }
          const hasOptions = !!opts.options.length
          visible.value = hasOptions
            ? props.items.length
              ? true
              : false
            : visible.value

          component?.updateProps({
            ...props,
            visible: visible.value,
            slots: opts.slots ?? {},
          })
        },

        onKeyDown(suggestionKeyDownProps: SuggestionKeyDownProps) {
          const hasOptions = !!opts.options.length
          if (hasOptions) {
            if (suggestionKeyDownProps.event.key === 'Escape') {
              hiddenPopup()
              return true
            }
            return component?.ref?.onKeyDown?.(suggestionKeyDownProps)
          }
        },

        onExit() {
          destroy()
        },
      }
    },
  }

  return {
    destroy,
    suggestion,
    hiddenPopup,
    getVisible,
  }
}
