import {
  computed,
  defineComponent,
  h,
  nextTick,
  onActivated,
  onMounted,
  ref,
  watch,
} from 'vue'
import { ElTooltip, useNamespace } from 'element-plus'
import { useWindowSize } from '@element-plus/hooks'
import { DIV_TAG, SPAN_TAG } from '@element-plus/constants'
import { textEllipsisEmits, textEllipsisProps } from './text-ellipsis'

export default defineComponent({
  name: 'ElTextEllipsis',

  props: textEllipsisProps,

  emits: textEllipsisEmits,

  setup(props, { attrs, emit, slots, expose }) {
    const ns = useNamespace('text-ellipsis')
    const { width } = useWindowSize()
    const text = ref(props.content)
    const expanded = ref(false)
    const hasAction = ref(false)
    const root = ref<HTMLElement>()
    const actionRef = ref<HTMLElement>()
    let needRecalculate = false

    const actionText = computed(() =>
      expanded.value ? props.collapseText : props.expandText
    )

    const pxToNum = (value: string | null) => {
      if (!value) return 0
      const match = value.match(/^\d*(\.\d*)?/)
      return match ? Number(match[0]) : 0
    }

    const cloneContainer = () => {
      if (!root.value || !root.value.isConnected) return

      const originStyle = window.getComputedStyle(root.value)
      const container = document.createElement('div')
      const styleNames: string[] = Array.prototype.slice.apply(originStyle)

      styleNames.forEach((name) => {
        container.style.setProperty(name, originStyle.getPropertyValue(name))
      })

      container.style.position = 'fixed'
      container.style.zIndex = '-9999'
      container.style.top = '-9999px'
      container.style.height = 'auto'
      container.style.minHeight = 'auto'
      container.style.maxHeight = 'auto'

      container.innerText = props.content
      document.body.appendChild(container)

      return container
    }

    const calcEllipsisText = (container: HTMLDivElement, maxHeight: number) => {
      const { content, position, dots } = props
      const end = content.length
      const middle = (0 + end) >> 1
      const actionHTML = slots.action
        ? actionRef.value?.outerHTML ?? ''
        : props.expandText

      const calcEllipse = () => {
        // calculate the former or later content
        const tail = (left: number, right: number): string => {
          if (right - left <= 1) {
            if (position === 'end') {
              return content.slice(0, left) + dots
            }
            return dots + content.slice(right, end)
          }

          const middle = Math.round((left + right) / 2)

          // Set the interception location
          if (position === 'end') {
            container.innerText = content.slice(0, middle) + dots
          } else {
            container.innerText = dots + content.slice(middle, end)
          }

          container.innerHTML += actionHTML

          // The height after interception still does not match the rquired height
          if (container.offsetHeight > maxHeight) {
            if (position === 'end') {
              return tail(left, middle)
            }
            return tail(middle, right)
          }

          if (position === 'end') {
            return tail(middle, right)
          }

          return tail(left, middle)
        }

        return tail(0, end)
      }

      const middleTail = (
        leftPart: [number, number],
        rightPart: [number, number]
      ): string => {
        if (
          leftPart[1] - leftPart[0] <= 1 &&
          rightPart[1] - rightPart[0] <= 1
        ) {
          return (
            content.slice(0, leftPart[0]) +
            dots +
            content.slice(rightPart[1], end)
          )
        }

        const leftMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2)
        const rightMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2)

        container.innerText =
          props.content.slice(0, leftMiddle) +
          props.dots +
          props.content.slice(rightMiddle, end)
        container.innerHTML += actionHTML

        if (container.offsetHeight >= maxHeight) {
          return middleTail(
            [leftPart[0], leftMiddle],
            [rightMiddle, rightPart[1]]
          )
        }

        return middleTail(
          [leftMiddle, leftPart[1]],
          [rightPart[0], rightMiddle]
        )
      }

      return props.position === 'middle'
        ? middleTail([0, middle], [middle, end])
        : calcEllipse()
    }

    const calcEllipsised = () => {
      // Calculate the interceptional text
      const container = cloneContainer()

      if (!container) {
        needRecalculate = true
        return
      }

      const { paddingBottom, paddingTop, lineHeight } = container.style
      const maxHeight = Math.ceil(
        (Number(props.rows) + 0.5) * pxToNum(lineHeight) +
          pxToNum(paddingTop) +
          pxToNum(paddingBottom)
      )

      if (maxHeight < container.offsetHeight) {
        hasAction.value = true
        text.value = calcEllipsisText(container, maxHeight)
      } else {
        hasAction.value = false
        text.value = props.content
      }

      document.body.removeChild(container)
    }

    const toggle = (isExpanded = !expanded.value) => {
      expanded.value = isExpanded
    }

    const onClickAction = (event: MouseEvent) => {
      toggle()
      emit('clickAction', event)
    }

    const renderAction = () => {
      const action = slots.action
        ? slots.action({ expanded: expanded.value })
        : actionText.value
      return h(
        'span',
        {
          ref: actionRef,
          class: ns.e('action'),
          onClick: onClickAction,
        },
        action
      )
    }

    onMounted(() => {
      calcEllipsised()

      if (slots.action) {
        nextTick(calcEllipsised)
      }
    })

    onActivated(() => {
      if (needRecalculate) {
        needRecalculate = false
        calcEllipsised()
      }
    })

    watch(
      () => [props.content, props.rows, props.position, width.value],
      calcEllipsised
    )

    const renderContent = () => {
      return h(
        ElTooltip,
        {
          disabled: !hasAction.value,
          ...props.tooltipOptions,
        },
        {
          default: () => {
            return h(DIV_TAG, { ref: root, class: [ns.b(), attrs.class] }, [
              text.value,
            ])
          },
          content: () =>
            slots.content?.({ content: props.content, text: text.value }) ??
            h(SPAN_TAG, props.content),
        }
      )
    }

    expose({ toggle })

    return () =>
      props.showOverflowTooltip
        ? renderContent()
        : h(DIV_TAG, { ref: root, class: ns.b() }, [
            expanded.value ? props.content : text.value,
            hasAction.value ? renderAction() : null,
          ])
  },
})
