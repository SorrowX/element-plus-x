import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ResizableProps } from './resizable'
import type {
  IBeforeMoveState,
  IDelta,
  ILimitValue,
  ILimits,
  IMoveType,
  IState,
  IStick,
} from './types'
import type { Ref } from 'vue'

export const useResizable = (
  target: Ref<HTMLElement | null> = ref(null),
  container: Ref<HTMLElement | null> = ref(null),
  props: ResizableProps,
  emit: any
) => {
  const bodyDrag = ref(false)
  const stickDrag = ref(false)

  const state = reactive<IState>({
    parentWidth: 0, //  target父元素的宽度
    parentHeight: 0, //  target父元素的高度
    zIndex: 1, // target元素的层级
    left: 0, // target元素的left值
    top: 0, // target元素的top值
    right: 0, // target元素的right值
    bottom: 0, // target元素的bottom值
    aspectFactor: 1,
  })

  const beforeMoveState = reactive<IBeforeMoveState>({
    pointerX: 0, // 鼠标按下的x坐标
    pointerY: 0, // 鼠标按下的y坐标
    left: 0, // 同state.left
    right: 0, // 同state.right
    top: 0, // 同state.top
    bottom: 0, // 同state.bottom
    width: 0, // container元素的宽度
    height: 0, // container元素的高度
  })

  const limits = reactive<ILimits>({
    left: { min: null, max: null },
    right: { min: null, max: null },
    top: { min: null, max: null },
    bottom: { min: null, max: null },
  })

  // container元素的宽度
  const width = computed(() => state.parentWidth - state.left - state.right)

  // container元素的高度
  const height = computed(() => state.parentHeight - state.top - state.bottom)

  // container元素的尺寸样式
  const containerStyle = computed(() => {
    return {
      width: props.w == 'auto' ? 'auto' : `${width.value}px`,
      height: props.h == 'auto' ? 'auto' : `${height.value}px`,
    }
  })

  // target元素的位置
  const targetStyle = computed(() => {
    return {
      top: `${state.top}px`,
      left: `${state.left}px`,
      zIndex: state.zIndex,
    }
  })

  // target元素的位置信息及container元素的尺寸大小
  const rect = computed(() => {
    return {
      left: Math.round(state.left),
      top: Math.round(state.top),
      width: Math.round(width.value),
      height: Math.round(height.value),
    }
  })

  const saveBeforeMoveState = ({
    pointerX,
    pointerY,
  }: {
    pointerX: number
    pointerY: number
  }) => {
    beforeMoveState.pointerX = pointerX
    beforeMoveState.pointerY = pointerY

    beforeMoveState.left = state.left
    beforeMoveState.right = state.right
    beforeMoveState.top = state.top
    beforeMoveState.bottom = state.bottom

    beforeMoveState.width = width.value
    beforeMoveState.height = height.value

    state.aspectFactor = width.value / height.value
  }

  const sideCorrectionByLimit = (
    limit: { min: ILimitValue; max: ILimitValue },
    current: number
  ) => {
    let value = current

    if (limit.min !== null && current < limit.min) {
      value = limit.min
    } else if (limit.max !== null && limit.max < current) {
      value = limit.max
    }

    return value
  }

  const rectCorrectionByLimit = (rect: {
    newRight: number
    newLeft: number
    newBottom: number
    newTop: number
  }) => {
    let { newRight, newLeft, newBottom, newTop } = rect

    newLeft = sideCorrectionByLimit(limits.left, newLeft)
    newRight = sideCorrectionByLimit(limits.right, newRight)
    newTop = sideCorrectionByLimit(limits.top, newTop)
    newBottom = sideCorrectionByLimit(limits.bottom, newBottom)

    return {
      newLeft,
      newRight,
      newTop,
      newBottom,
    }
  }

  const rectCorrectionByAspectRatio = (rect: any, currentStick: string) => {
    let { newLeft, newRight, newTop, newBottom } = rect
    const { parentWidth, parentHeight, aspectFactor } = state

    let newWidth = parentWidth - newLeft - newRight
    let newHeight = parentHeight - newTop - newBottom

    if (currentStick[1] === 'm') {
      const deltaHeight = newHeight - beforeMoveState.height

      newLeft -= (deltaHeight * aspectFactor) / 2
      newRight -= (deltaHeight * aspectFactor) / 2
    } else if (currentStick[0] === 'm') {
      const deltaWidth = newWidth - beforeMoveState.width

      newTop -= deltaWidth / aspectFactor / 2
      newBottom -= deltaWidth / aspectFactor / 2
    } else if (newWidth / newHeight > aspectFactor) {
      newWidth = aspectFactor * newHeight

      if (currentStick[1] === 'l') {
        newLeft = parentWidth - newRight - newWidth
      } else {
        newRight = parentWidth - newLeft - newWidth
      }
    } else {
      newHeight = newWidth / aspectFactor

      if (currentStick[0] === 't') {
        newTop = parentHeight - newBottom - newHeight
      } else {
        newBottom = parentHeight - newTop - newHeight
      }
    }

    return { newLeft, newRight, newTop, newBottom }
  }

  const stickMove = (
    evt: PointerEvent,
    delta: IDelta,
    currentStick: IStick
  ) => {
    const { gridY, gridX, snapToGrid } = props
    const { parentHeight, parentWidth } = state

    let newTop = beforeMoveState.top
    let newBottom = beforeMoveState.bottom
    let newLeft = beforeMoveState.left
    let newRight = beforeMoveState.right
    switch (currentStick[0]) {
      case 'b':
        newBottom = beforeMoveState.bottom + delta.y
        if (snapToGrid) {
          newBottom =
            parentHeight -
            Math.round((parentHeight - newBottom) / gridY) * gridY
        }
        break
      case 't':
        newTop = beforeMoveState.top - delta.y
        if (snapToGrid) {
          newTop = Math.round(newTop / gridY) * gridY
        }
        break
      default:
        break
    }

    switch (currentStick[1]) {
      case 'r':
        newRight = beforeMoveState.right + delta.x
        if (snapToGrid) {
          newRight =
            parentWidth - Math.round((parentWidth - newRight) / gridX) * gridX
        }
        break
      case 'l':
        newLeft = beforeMoveState.left - delta.x
        if (snapToGrid) {
          newLeft = Math.round(newLeft / gridX) * gridX
        }
        break
      default:
        break
    }

    ;({ newLeft, newRight, newTop, newBottom } = rectCorrectionByLimit({
      newLeft,
      newRight,
      newTop,
      newBottom,
    }))

    if (props.aspectRatio) {
      ;({ newLeft, newRight, newTop, newBottom } = rectCorrectionByAspectRatio(
        {
          newLeft,
          newRight,
          newTop,
          newBottom,
        },
        currentStick
      ))
    }

    state.left = newLeft
    state.right = newRight
    state.top = newTop
    state.bottom = newBottom

    emit('resize', evt, rect.value)
  }

  const calcDragLimitation = () => {
    const { parentWidth, parentHeight } = state

    return {
      left: { min: 0, max: parentWidth - width.value },
      right: { min: 0, max: parentWidth - width.value },
      top: { min: 0, max: parentHeight - height.value },
      bottom: { min: 0, max: parentHeight - height.value },
    }
  }

  const targetDown = (evt: PointerEvent) => {
    const { button } = evt

    if (!props.isDraggable || (button && button !== 0)) {
      return
    }

    evt.stopPropagation?.()
    evt.preventDefault?.()

    bodyDrag.value = true

    const pointerX = evt.pageX
    const pointerY = evt.pageY

    saveBeforeMoveState({ pointerX, pointerY })

    if (props.parentLimitation) {
      Object.assign(limits, calcDragLimitation())
    }

    emit('drag-start', evt, rect.value)
  }

  const targetMove = (evt: PointerEvent, delta: IDelta) => {
    const { parentWidth, parentHeight } = state
    const { gridX, gridY } = props

    let newTop = beforeMoveState.top - delta.y
    let newBottom = beforeMoveState.bottom + delta.y
    let newLeft = beforeMoveState.left - delta.x
    let newRight = beforeMoveState.right + delta.x

    if (props.snapToGrid) {
      let alignTop = true
      let alignLeft = true

      let diffT = newTop - Math.floor(newTop / gridY) * gridY
      let diffB =
        parentHeight -
        newBottom -
        Math.floor((parentHeight - newBottom) / gridY) * gridY
      let diffL = newLeft - Math.floor(newLeft / gridX) * gridX
      let diffR =
        parentWidth -
        newRight -
        Math.floor((parentWidth - newRight) / gridX) * gridX

      if (diffT > gridY / 2) {
        diffT -= gridY
      }
      if (diffB > gridY / 2) {
        diffB -= gridY
      }
      if (diffL > gridX / 2) {
        diffL -= gridX
      }
      if (diffR > gridX / 2) {
        diffR -= gridX
      }

      if (Math.abs(diffB) < Math.abs(diffT)) {
        alignTop = false
      }
      if (Math.abs(diffR) < Math.abs(diffL)) {
        alignLeft = false
      }

      newTop -= alignTop ? diffT : diffB
      newBottom = parentHeight - height.value - newTop
      newLeft -= alignLeft ? diffL : diffR
      newRight = parentWidth - width.value - newLeft
    }

    ;({
      newLeft: state.left,
      newRight: state.right,
      newTop: state.top,
      newBottom: state.bottom,
    } = rectCorrectionByLimit({ newLeft, newRight, newTop, newBottom }))

    emit('drag', evt, rect.value)
  }

  const targetUp = (evt: PointerEvent) => {
    bodyDrag.value = false

    Object.assign(beforeMoveState, {
      pointerX: 0,
      pointerY: 0,
    })

    Object.assign(limits, {
      left: { min: null, max: null },
      right: { min: null, max: null },
      top: { min: null, max: null },
      bottom: { min: null, max: null },
    })

    emit('drag-end', evt, rect.value)
  }

  const move = (evt: PointerEvent, type: IMoveType, currentStick?: IStick) => {
    evt.stopPropagation?.()

    const pageX = evt.pageX
    const pageY = evt.pageY

    const delta: IDelta = {
      x: (beforeMoveState.pointerX - pageX) / props.parentScaleX,
      y: (beforeMoveState.pointerY - pageY) / props.parentScaleY,
    }

    if (type === 'stickMove') {
      stickMove(evt, delta, currentStick as IStick)
    }

    if (type === 'targetMove') {
      if (props.axis === 'x') {
        delta.y = 0
      } else if (props.axis === 'y') {
        delta.x = 0
      } else if (props.axis === 'none') {
        return
      }
      targetMove(evt, delta)
    }
  }

  const calcResizeLimits = (stick: IStick) => {
    const { aspectFactor, bottom, top, left, right } = state
    let { minh: minHeight, minw: minWidth } = props

    const parentLim = props.parentLimitation ? 0 : null

    if (props.aspectRatio) {
      if (minWidth / minHeight > aspectFactor) {
        minHeight = minWidth / aspectFactor
      } else {
        minWidth = aspectFactor * minHeight
      }
    }

    const limits: any = {
      left: { min: parentLim, max: left + (width.value - minWidth) },
      right: { min: parentLim, max: right + (width.value - minWidth) },
      top: { min: parentLim, max: top + (height.value - minHeight) },
      bottom: { min: parentLim, max: bottom + (height.value - minHeight) },
    }

    if (props.aspectRatio) {
      const aspectLimits = {
        left: {
          min: left - Math.min(top, bottom) * aspectFactor * 2,
          max: left + ((height.value - minHeight) / 2) * aspectFactor * 2,
        },
        right: {
          min: right - Math.min(top, bottom) * aspectFactor * 2,
          max: right + ((height.value - minHeight) / 2) * aspectFactor * 2,
        },
        top: {
          min: top - (Math.min(left, right) / aspectFactor) * 2,
          max: top + ((width.value - minWidth) / 2 / aspectFactor) * 2,
        },
        bottom: {
          min: bottom - (Math.min(left, right) / aspectFactor) * 2,
          max: bottom + ((width.value - minWidth) / 2 / aspectFactor) * 2,
        },
      }

      if (stick[0] === 'm') {
        limits.left = {
          min: Math.max(limits.left.min, aspectLimits.left.min),
          max: Math.min(limits.left.max, aspectLimits.left.max),
        }
        limits.right = {
          min: Math.max(limits.right.min, aspectLimits.right.min),
          max: Math.min(limits.right.max, aspectLimits.right.max),
        }
      } else if (stick[1] === 'm') {
        limits.top = {
          min: Math.max(limits.top.min, aspectLimits.top.min),
          max: Math.min(limits.top.max, aspectLimits.top.max),
        }
        limits.bottom = {
          min: Math.max(limits.bottom.min, aspectLimits.bottom.min),
          max: Math.min(limits.bottom.max, aspectLimits.bottom.max),
        }
      }
    }

    return limits
  }

  const stickDown = (evt: PointerEvent, stick: IStick, force = false) => {
    if (!props.isResizable && !force) {
      return
    }

    stickDrag.value = true

    const pointerX = evt.pageX
    const pointerY = evt.pageY

    saveBeforeMoveState({ pointerX, pointerY })

    Object.assign(limits, calcResizeLimits(stick))

    emit('resize-start', evt, rect.value)
  }

  const stickUp = (evt: PointerEvent) => {
    stickDrag.value = false

    Object.assign(beforeMoveState, {
      pointerX: 0,
      pointerY: 0,
    })

    Object.assign(limits, {
      left: { min: null, max: null },
      right: { min: null, max: null },
      top: { min: null, max: null },
      bottom: { min: null, max: null },
    })

    emit('resize-end', evt, rect.value)
  }

  watch(
    () => props.parentW,
    (val) => {
      state.right = val - width.value - state.left
      state.parentWidth = val
    }
  )
  watch(
    () => props.parentH,
    (val) => {
      state.bottom = val - height.value - state.top
      state.parentHeight = val
    }
  )

  onMounted(() => {
    const parentElement = target.value?.parentNode as HTMLElement
    const containerElement = container.value as HTMLElement
    state.parentWidth = props.parentW
      ? props.parentW
      : parentElement.clientWidth
    state.parentHeight = props.parentH
      ? props.parentH
      : parentElement.clientHeight

    state.left = props.x
    state.top = props.y
    state.right =
      state.parentWidth -
      ((props.w === 'auto'
        ? containerElement.scrollWidth
        : props.w) as number) -
      state.left
    state.bottom =
      state.parentHeight -
      ((props.h === 'auto'
        ? containerElement.scrollHeight
        : props.h) as number) -
      state.top
  })

  return {
    move,
    stickDown,
    stickUp,
    targetDown,
    targetUp,
    targetStyle,
    containerStyle,
  }
}
