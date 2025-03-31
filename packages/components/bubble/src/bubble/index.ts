import {
  computed,
  defineComponent,
  h,
  isVNode,
  ref,
  toValue,
  unref,
  watch,
  watchEffect,
} from 'vue'
import { ElAvatar, useNamespace } from 'element-plus'
import { DIV_TAG } from '@element-plus/constants'
import { UserFilled } from '@element-plus/icons-vue'
import { isBoolean } from '@element-plus/utils'
import { useBubbleContextInject } from '../context'
import useTypedEffect from '../hooks/use-typed-effect'
import useTypingConfig from '../hooks/use-typing-config'
import Loading from '../loading'
import { bubbleProps } from './bubble'

export default defineComponent({
  name: 'ElBubble',
  props: bubbleProps,
  setup(props, { attrs, slots, expose }) {
    const ns = useNamespace('bubble')
    const prefixCls = ns.b()

    const content = computed(() => props.content ?? '')

    const { onUpdate } = unref(useBubbleContextInject())

    const divRef = ref<HTMLDivElement>()

    const [typingEnabled, typingStep, typingInterval, typingSuffix] =
      useTypingConfig(props)

    const [typedContent, isTyping] = useTypedEffect(
      content,
      typingEnabled,
      typingStep,
      typingInterval
    )

    const hasTypingClass = computed(
      () =>
        isTyping.value &&
        !props.loading &&
        !props.messageRender &&
        !typingSuffix.value
    )

    const triggerTypingCompleteRef = ref(false)
    watchEffect(() => {
      if (!isTyping.value && !props.loading) {
        if (!triggerTypingCompleteRef.value) {
          triggerTypingCompleteRef.value = true
          props.onTypingComplete?.()
        }
      } else {
        triggerTypingCompleteRef.value = false
      }
    })

    watch(typedContent, () => {
      onUpdate?.()
    })

    expose({
      nativeElement: divRef,
    })

    return () => {
      const {
        avatar,
        messageRender,
        loading,
        loadingRender,
        variant,
        shape,
        header,
        footer,
        placement,
      } = props

      const renderAvatar = () => {
        return avatar || slots.avatar
          ? h(
              DIV_TAG,
              {
                class: ns.b('avatar'),
              },
              [
                slots.avatar
                  ? slots.avatar()
                  : isVNode(avatar)
                  ? avatar
                  : h(ElAvatar, {
                      icon: UserFilled,
                      ...(isBoolean(avatar) ? {} : avatar),
                    }),
              ]
            )
          : ''
      }

      const renderHeader = () => {
        return (
          (header || slots.header) &&
          h(
            DIV_TAG,
            {
              style: props.headerStyle,
              class: [`${prefixCls}-header`, props.headerClass],
            },
            slots.header?.() ?? header
          )
        )
      }

      const renderContent = () => {
        const mergedContent = () =>
          messageRender
            ? messageRender(typedContent.value as any)
            : typedContent.value

        const contentNode = () => {
          if (loading || slots.loading) {
            return [
              slots.loading
                ? slots.loading()
                : loadingRender
                ? loadingRender()
                : h(Loading),
            ]
          } else {
            return [
              slots.content ? slots.content() : mergedContent(),
              isTyping.value ? toValue(typingSuffix) : '',
            ]
          }
        }

        return h(
          DIV_TAG,
          {
            style: props.contentStyle,
            class: [
              `${prefixCls}-content`,
              `${prefixCls}-content-${variant}`,
              { [`${prefixCls}-content-${shape}`]: shape },
              props.contentClass,
            ],
          },
          contentNode() as any
        )
      }

      const renderFooter = () => {
        return (
          (footer || slots.footer) &&
          h(
            DIV_TAG,
            {
              style: props.footerStyle,
              class: [`${prefixCls}-footer`, props.footerClass],
            },
            slots.footer?.() ?? footer
          )
        )
      }

      const renderFullContent = () => {
        const contentVNode = renderContent()
        if (header || slots.header || footer || slots.footer) {
          return h(
            DIV_TAG,
            {
              class: ns.b('content-wrapper'),
            },
            [renderHeader(), contentVNode, renderFooter()]
          )
        }
        return contentVNode
      }

      return h(
        DIV_TAG,
        {
          ...attrs,
          ref: divRef,
          class: [
            prefixCls,
            ns.b(placement),
            hasTypingClass.value ? [ns.b('typing')] : '',
          ].concat((attrs as any).class),
        },
        [renderAvatar(), renderFullContent()]
      )
    }
  },
})
