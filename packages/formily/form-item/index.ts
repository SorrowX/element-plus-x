import {
  Transition,
  defineComponent,
  h,
  onBeforeUnmount,
  provide,
  ref,
  watch,
} from 'vue'
import { isVoidField } from '@formily/core'
import { connect, mapProps } from '@formily/vue'
import { ElIcon, ElPopover, ElTooltip, useNamespace } from 'element-plus'
import {
  CircleCheck,
  CircleClose,
  InfoFilled,
  Warning,
} from '@element-plus/icons-vue'
import { FormLayoutShallowContext, useFormLayout } from '../form-layout'
import { composeExport, resolveComponent, stylePrefix } from '../__builtins__'
import type { Component, Ref } from 'vue'

export type FormItemProps = {
  className?: string
  required?: boolean
  label?: string | Component
  colon?: boolean
  tooltip?: string | Component
  layout?: 'vertical' | 'horizontal' | 'inline'
  labelStyle?: Record<string, any>
  labelAlign?: 'left' | 'right'
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  labelCol?: number
  wrapperCol?: number
  wrapperAlign?: 'left' | 'right'
  wrapperWrap?: boolean
  wrapperStyle?: Record<string, any>
  fullness?: boolean
  addonBefore?: string | Component
  addonAfter?: string | Component
  prefix?: string | Component
  suffix?: string | Component
  size?: 'small' | 'default' | 'large'
  extra?: string
  feedbackText?: string | Component
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none' | (string & {})
  feedbackStatus?: 'error' | 'warning' | 'success' | 'pending' | (string & {})
  tooltipLayout?: 'icon' | 'text'
  feedbackIcon?: string | Component
  asterisk?: boolean
  gridSpan?: number | string
  bordered?: boolean
  inset?: boolean
}

const useOverflow = (containerRef: Ref<HTMLElement>) => {
  const overflow = ref(false)
  let resizeObserver: ResizeObserver | null = null

  const cleanup = () => {
    if (resizeObserver) {
      resizeObserver.unobserve(containerRef.value)
      resizeObserver = null
    }
  }

  const observer = () => {
    const container = containerRef.value
    const content: any = container.querySelector('label')
    const containerWidth = container.getBoundingClientRect().width
    const contentWidth = content.getBoundingClientRect().width

    if (containerWidth !== 0) {
      if (contentWidth > containerWidth) {
        overflow.value = true
      } else {
        overflow.value = false
      }
    }
  }

  const stopWatch = watch(
    () => containerRef.value,
    (el) => {
      cleanup()

      if (el) {
        resizeObserver = new ResizeObserver(observer)
        resizeObserver.observe(el)
      }
    },
    { immediate: true, flush: 'post' }
  )

  onBeforeUnmount(() => {
    cleanup()
    stopWatch()
  })

  return overflow
}

const ICON_MAP = {
  info: () => h(ElIcon, {}, { default: () => h(InfoFilled) }),
  error: () => h(ElIcon, {}, { default: () => h(CircleClose) }),
  success: () => h(ElIcon, {}, { default: () => h(CircleCheck) }),
  warning: () => h(ElIcon, {}, { default: () => h(Warning) }),
}

export const FormBaseItem = defineComponent<FormItemProps>({
  name: 'FormItem',
  props: {
    className: {},
    required: {},
    label: {},
    colon: {},
    layout: {},
    tooltip: {},
    labelStyle: {},
    labelAlign: {},
    labelWrap: {},
    labelWidth: {},
    wrapperWidth: {},
    labelCol: {},
    wrapperCol: {},
    wrapperAlign: {},
    wrapperWrap: {},
    wrapperStyle: {},
    fullness: {},
    addonBefore: {},
    addonAfter: {},
    size: {},
    extra: {},
    feedbackText: {},
    feedbackLayout: {},
    tooltipLayout: {},
    feedbackStatus: {},
    feedbackIcon: {},
    asterisk: {},
    gridSpan: {},
    bordered: { default: true },
    inset: { default: false },
    prefix: {},
    suffix: {},
  },
  setup(props, { slots }) {
    const active = ref(false)
    const deepLayoutRef = useFormLayout()
    const prefixCls = `${stylePrefix}-form-item`

    const ns = useNamespace('f-form-item')

    const containerRef: Ref<any> = ref<HTMLElement>()
    const overflow = useOverflow(containerRef)

    // provide(FormLayoutShallowContext, ref(null))
    provide(FormLayoutShallowContext, ref({}))

    return () => {
      const gridStyles: Record<string, any> = {}

      const deepLayout = deepLayoutRef.value
      const {
        label,
        colon = deepLayout.colon ?? true,
        layout = deepLayout.layout ?? 'horizontal',
        tooltip,
        labelStyle = {},
        labelWrap = deepLayout.labelWrap ?? false,
        labelWidth = deepLayout.labelWidth,
        wrapperWidth = deepLayout.wrapperWidth,
        labelCol = deepLayout.labelCol,
        wrapperCol = deepLayout.wrapperCol,
        wrapperAlign = deepLayout.wrapperAlign ?? 'left',
        wrapperWrap = deepLayout.wrapperWrap,
        wrapperStyle = {},
        fullness = deepLayout.fullness,
        addonBefore,
        addonAfter,
        prefix, //  add
        suffix, //  add
        size = deepLayout.size,
        extra,
        feedbackText,
        feedbackLayout = deepLayout.feedbackLayout,
        tooltipLayout = deepLayout.tooltipLayout ?? 'icon',
        feedbackStatus,
        feedbackIcon,
        asterisk,
        bordered = deepLayout.bordered,
        inset = deepLayout.inset,
      } = props as any

      const labelAlign =
        deepLayout.layout === 'vertical'
          ? props.labelAlign ?? deepLayout.labelAlign ?? 'left'
          : props.labelAlign ?? deepLayout.labelAlign ?? 'right'

      // 固定宽度
      let enableCol = false
      if (labelWidth || wrapperWidth) {
        if (labelWidth) {
          labelStyle.width = `${labelWidth}px`
          labelStyle.maxWidth = `${labelWidth}px`
        }
        if (wrapperWidth) {
          wrapperStyle.width = `${wrapperWidth}px`
          wrapperStyle.maxWidth = `${wrapperWidth}px`
        }
        // 栅格模式
      } else if (labelCol || wrapperCol) {
        enableCol = true
      }

      const formatChildren =
        feedbackLayout === 'popover'
          ? h(
              ElPopover,
              {
                disabled: !feedbackText,
                placement: 'top',
                width: 'auto',
              },
              {
                reference: () =>
                  h('div', {}, { default: () => slots.default?.() }),
                default: () => [
                  h(
                    'div',
                    {
                      class: {
                        [`${prefixCls}-${feedbackStatus}-help`]:
                          !!feedbackStatus,
                      },
                    },
                    {
                      default: () => [
                        feedbackStatus &&
                        ['error', 'success', 'warning'].includes(feedbackStatus)
                          ? ICON_MAP[
                              feedbackStatus as 'error' | 'success' | 'warning'
                            ]()
                          : '',
                        resolveComponent(feedbackText),
                      ],
                    }
                  ),
                ],
              }
            )
          : slots.default?.()

      const renderLabelText = () => {
        const labelChildren = h(
          'div',
          {
            class: `${prefixCls}-label-content`,
            ref: containerRef,
          },
          {
            default: () => [
              asterisk &&
                h(
                  'span',
                  { class: `${prefixCls}-asterisk` },
                  { default: () => ['*'] }
                ),
              h('label', {}, { default: () => [resolveComponent(label)] }),
            ],
          }
        )
        const isTextTooltip = tooltip && tooltipLayout === 'text'
        if (isTextTooltip || overflow.value) {
          return h(
            ElTooltip,
            {
              placement: 'top',
            },
            {
              default: () => [labelChildren],
              content: () =>
                h(
                  'div',
                  {},
                  {
                    default: () => [
                      overflow.value && resolveComponent(label),
                      isTextTooltip && resolveComponent(tooltip),
                    ],
                  }
                ),
            }
          )
        } else {
          return labelChildren
        }
      }
      const renderTooltipIcon = () => {
        if (tooltip && tooltipLayout === 'icon') {
          return h(
            'span',
            {
              class: `${prefixCls}-label-tooltip`,
            },
            {
              default: () => [
                h(
                  ElTooltip,
                  {
                    placement: 'top',
                  },
                  {
                    default: ICON_MAP.info,
                    content: () =>
                      h(
                        'div',
                        {
                          class: `${prefixCls}-label-tooltip-content`,
                        },
                        {
                          default: () => [resolveComponent(tooltip)],
                        }
                      ),
                  }
                ),
              ],
            }
          )
        }
      }
      const renderLabel =
        label &&
        h(
          'div',
          {
            class: {
              [`${prefixCls}-label`]: true,
              // [`${prefixCls}-label-tooltip`]:
              //   (tooltip && tooltipLayout === 'text') || overflow.value,
              [`${prefixCls}-item-col-${labelCol}`]: enableCol && !!labelCol,
            },
            style: labelStyle,
          },
          {
            default: () => [
              prefix &&
                h(
                  'div',
                  { class: `${prefixCls}-label-prefix` },
                  {
                    default: () => [resolveComponent(prefix)],
                  }
                ),
              // label content
              renderLabelText(),
              // label tooltip
              renderTooltipIcon(),
              // label colon
              label &&
                h(
                  'span',
                  {
                    class: `${prefixCls}-colon`,
                  },
                  { default: () => [colon ? ':' : ''] }
                ),
              suffix &&
                h(
                  'div',
                  { class: `${prefixCls}-label-suffix` },
                  {
                    default: () => [resolveComponent(suffix)],
                  }
                ),
            ],
          }
        )

      const shouldShowError =
        !!feedbackText &&
        feedbackLayout !== 'popover' &&
        feedbackLayout !== 'none'

      const renderFeedback = h(
        Transition,
        {
          name: `${ns.namespace.value}-zoom-in-top`,
        },
        {
          default: () =>
            shouldShowError
              ? h(
                  'div',
                  {
                    class: {
                      [`${prefixCls}-${feedbackStatus}-help`]: !!feedbackStatus,
                      [`${prefixCls}-help`]: true,
                    },
                  },
                  { default: () => [resolveComponent(feedbackText)] }
                )
              : '',
        }
      )

      const renderExtra =
        extra &&
        h(
          'div',
          { class: `${prefixCls}-extra` },
          { default: () => [resolveComponent(extra)] }
        )
      const renderContent = h(
        'div',
        {
          class: {
            [`${prefixCls}-control`]: true,
            [`${prefixCls}-item-col-${wrapperCol}`]: enableCol && !!wrapperCol,
          },
        },
        {
          default: () => [
            h(
              'div',
              { class: `${prefixCls}-control-content` },
              {
                default: () => [
                  addonBefore &&
                    h(
                      'div',
                      { class: `${prefixCls}-addon-before` },
                      {
                        default: () => [resolveComponent(addonBefore)],
                      }
                    ),
                  h(
                    'div',
                    {
                      class: {
                        [`${prefixCls}-control-content-component`]: true,
                        [`${prefixCls}-control-content-component-has-feedback-icon`]:
                          !!feedbackIcon,
                      },
                      style: wrapperStyle,
                    },
                    {
                      default: () => [
                        formatChildren,
                        feedbackIcon &&
                          h(
                            'div',
                            { class: `${prefixCls}-feedback-icon` },
                            {
                              default: () => [
                                typeof feedbackIcon === 'string'
                                  ? h('i', { class: feedbackIcon }, {})
                                  : resolveComponent(feedbackIcon),
                              ],
                            }
                          ),
                      ],
                    }
                  ),
                  addonAfter &&
                    h(
                      'div',
                      { class: `${prefixCls}-addon-after` },
                      {
                        default: () => [resolveComponent(addonAfter)],
                      }
                    ),
                ],
              }
            ),
            renderFeedback,
            renderExtra,
          ],
        }
      )
      return h(
        'div',
        {
          'data-grid-span': props.gridSpan,
          style: {
            ...gridStyles,
          },
          class: {
            [`${prefixCls}`]: true,
            [`${prefixCls}-layout-${layout}`]: true,
            [`${prefixCls}-${feedbackStatus}`]: !!feedbackStatus,
            [`${prefixCls}-feedback-has-text`]: !!feedbackText,
            [`${prefixCls}-size-${size}`]: !!size,
            [`${prefixCls}-feedback-layout-${feedbackLayout}`]:
              !!feedbackLayout,
            [`${prefixCls}-fullness`]: !!fullness || !!inset || !!feedbackIcon,
            [`${prefixCls}-inset`]: !!inset,
            [`${prefixCls}-active`]: active.value,
            [`${prefixCls}-inset-active`]: !!inset && active.value,
            [`${prefixCls}-label-align-${labelAlign}`]: true,
            [`${prefixCls}-control-align-${wrapperAlign}`]: true,
            [`${prefixCls}-label-wrap`]: !!labelWrap,
            [`${prefixCls}-control-wrap`]: !!wrapperWrap,
            [`${prefixCls}-bordered-none`]:
              bordered === false || !!inset || !!feedbackIcon,
            [`${props.className}`]: !!props.className,
          },
          onFocus: () => {
            if (feedbackIcon || inset) {
              active.value = true
            }
          },
          onBlur: () => {
            if (feedbackIcon || inset) {
              active.value = false
            }
          },
        },
        {
          default: () => [renderLabel, renderContent],
        }
      )
    }
  },
})

const Item = connect(
  FormBaseItem,
  mapProps(
    { validateStatus: true, title: 'label', required: true },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      const takeMessage = () => {
        if (field.validating) return
        if (props.feedbackText) return props.feedbackText
        if (field.selfErrors.length) return field.selfErrors
        if (field.selfWarnings.length) return field.selfWarnings
        if (field.selfSuccesses.length) return field.selfSuccesses
      }
      const errorMessages = takeMessage()
      return {
        feedbackText: Array.isArray(errorMessages)
          ? errorMessages.join(', ')
          : errorMessages,
        extra: props.extra || field.description,
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props
      if (!field) return props
      return {
        feedbackStatus:
          field.validateStatus === 'validating'
            ? 'pending'
            : (Array.isArray(field.decorator) &&
                field.decorator[1]?.feedbackStatus) ||
              field.validateStatus,
      }
    },
    (props, field) => {
      if (isVoidField(field)) return props

      if (!field) return props
      let asterisk = false
      if (field.required && field.pattern !== 'readPretty') {
        asterisk = true
      }
      if ('asterisk' in props) {
        asterisk = props.asterisk
      }
      return {
        asterisk,
      }
    }
  )
)

export const FormItem = composeExport(Item, {
  BaseItem: FormBaseItem,
})

export default FormItem
