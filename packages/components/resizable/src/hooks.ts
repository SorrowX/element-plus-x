import { computed, onMounted, reactive, ref } from 'vue'
import { ResizableProps } from './resizable'
import type { Ref } from 'vue'

export const useResizable = (
  target: Ref<HTMLElement | null> = ref(null),
  container: Ref<HTMLElement | null> = ref(null),
  props: ResizableProps,
  emit: any
) => {
  const styleMapping: any = {
    x: {
      l: 'left',
      m: 'marginLeft',
      r: 'right',
    },
    y: {
      t: 'top',
      m: 'marginTop',
      b: 'bottom',
    },
  }

  const active = ref(false)
  const bodyDrag = ref(false)
  const stickDrag = ref(false)

  const data: any = reactive({
    fixAspectRatio: null,
    active: null,
    zIndex: null,
    parentWidth: null, //  target父元素的宽度
    parentHeight: null, //  target父元素的高度
    left: null, // target元素的left值
    top: null, // target元素的top值
    right: null, // target元素的right值
    bottom: null, // target元素的bottom值
    aspectFactor: 1,
  })

  const dimensionsBeforeMove: any = reactive({
    pointerX: 0,
    pointerY: 0,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  })

  const limits = reactive({
    left: { min: null, max: null },
    right: { min: null, max: null },
    top: { min: null, max: null },
    bottom: { min: null, max: null },
  })

  // container元素的宽度
  const width = computed(() => data.parentWidth - data.left - data.right)

  // container元素的高度
  const height = computed(() => data.parentHeight - data.top - data.bottom)

  // container元素的尺寸样式
  const sizeStyle = computed(() => {
    return {
      width: props.w == 'auto' ? 'auto' : `${width.value}px`,
      height: props.h == 'auto' ? 'auto' : `${height.value}px`,
    }
  })

  // target元素的位置
  const positionStyle = computed(() => {
    return {
      top: `${data.top}px`,
      left: `${data.left}px`,
      zIndex: data.zIndex,
    }
  })

  // target元素的位置信息及container元素的尺寸大小
  const rect = computed(() => {
    return {
      left: Math.round(data.left),
      top: Math.round(data.top),
      width: Math.round(width.value),
      height: Math.round(height.value),
    }
  })

  const vdrStick = computed(() => {
    return (stick: string) => {
      const { stickSize, parentScaleX, parentScaleY } = props
      const stickStyle: any = {
        width: `${stickSize / parentScaleX}px`,
        height: `${stickSize / parentScaleY}px`,
      }
      stickStyle[styleMapping.y[stick[0]]] = `${
        stickSize / parentScaleX / -2
      }px`
      stickStyle[styleMapping.x[stick[1]]] = `${
        stickSize / parentScaleX / -2
      }px`
      return stickStyle
    }
  })

  const saveDimensionsBeforeMove = ({ pointerX, pointerY }: any) => {
    dimensionsBeforeMove.pointerX = pointerX
    dimensionsBeforeMove.pointerY = pointerY

    dimensionsBeforeMove.left = data.left
    dimensionsBeforeMove.right = data.right
    dimensionsBeforeMove.top = data.top
    dimensionsBeforeMove.bottom = data.bottom

    dimensionsBeforeMove.width = width.value
    dimensionsBeforeMove.height = height.value

    data.aspectFactor = width.value / height.value
  }

  const sideCorrectionByLimit = (limit: any, current: string) => {
    let value = current

    if (limit.min !== null && current < limit.min) {
      value = limit.min
    } else if (limit.max !== null && limit.max < current) {
      value = limit.max
    }

    return value
  }

  const rectCorrectionByLimit = (rect: any) => {
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
    const { parentWidth, parentHeight, aspectFactor } = data

    let newWidth = parentWidth - newLeft - newRight
    let newHeight = parentHeight - newTop - newBottom

    if (currentStick[1] === 'm') {
      const deltaHeight = newHeight - dimensionsBeforeMove.height

      newLeft -= (deltaHeight * aspectFactor) / 2
      newRight -= (deltaHeight * aspectFactor) / 2
    } else if (currentStick[0] === 'm') {
      const deltaWidth = newWidth - dimensionsBeforeMove.width

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

  const stickMove = (delta: any, currentStick: string) => {
    const { gridY, gridX, snapToGrid } = props
    const { parentHeight, parentWidth } = data

    let newTop = dimensionsBeforeMove.top
    let newBottom = dimensionsBeforeMove.bottom
    let newLeft = dimensionsBeforeMove.left
    let newRight = dimensionsBeforeMove.right
    switch (currentStick[0]) {
      case 'b':
        newBottom = dimensionsBeforeMove.bottom + delta.y
        if (snapToGrid) {
          newBottom =
            parentHeight -
            Math.round((parentHeight - newBottom) / gridY) * gridY
        }
        break
      case 't':
        newTop = dimensionsBeforeMove.top - delta.y
        if (snapToGrid) {
          newTop = Math.round(newTop / gridY) * gridY
        }
        break
      default:
        break
    }

    switch (currentStick[1]) {
      case 'r':
        newRight = dimensionsBeforeMove.right + delta.x
        if (snapToGrid) {
          newRight =
            parentWidth - Math.round((parentWidth - newRight) / gridX) * gridX
        }
        break
      case 'l':
        newLeft = dimensionsBeforeMove.left - delta.x
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

    data.left = newLeft
    data.right = newRight
    data.top = newTop
    data.bottom = newBottom

    emit('resizing', rect.value)
  }

  const calcDragLimitation = () => {
    const { parentWidth, parentHeight } = data

    return {
      left: { min: 0, max: parentWidth - width.value },
      right: { min: 0, max: parentWidth - width.value },
      top: { min: 0, max: parentHeight - height.value },
      bottom: { min: 0, max: parentHeight - height.value },
    }
  }

  const bodyDown = (ev: any) => {
    const { button } = ev

    if (!props.preventActiveBehavior) {
      active.value = true
    }

    if (button && button !== 0) {
      return
    }

    emit('clicked', ev)

    if (!active.value) {
      return
    }

    if (typeof ev.stopPropagation !== 'undefined') {
      ev.stopPropagation()
    }

    if (typeof ev.preventDefault !== 'undefined') {
      ev.preventDefault()
    }

    if (props.isDraggable) {
      bodyDrag.value = true
    }

    const pointerX =
      typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX
    const pointerY =
      typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY

    saveDimensionsBeforeMove({ pointerX, pointerY })

    if (props.parentLimitation) {
      Object.assign(limits, calcDragLimitation())
    }
  }

  const bodyMove = (delta: any) => {
    const { parentWidth, parentHeight } = data
    const { gridX, gridY } = props

    let newTop = dimensionsBeforeMove.top - delta.y
    let newBottom = dimensionsBeforeMove.bottom + delta.y
    let newLeft = dimensionsBeforeMove.left - delta.x
    let newRight = dimensionsBeforeMove.right + delta.x

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
      newLeft: data.left,
      newRight: data.right,
      newTop: data.top,
      newBottom: data.bottom,
    } = rectCorrectionByLimit({ newLeft, newRight, newTop, newBottom }))

    emit('dragging', rect.value)
  }

  const bodyUp = () => {
    bodyDrag.value = false
    emit('dragging', rect.value)
    emit('dragstop', rect.value)

    Object.assign(dimensionsBeforeMove, {
      pointerX: 0,
      pointerY: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    })

    Object.assign(limits, {
      left: { min: null, max: null },
      right: { min: null, max: null },
      top: { min: null, max: null },
      bottom: { min: null, max: null },
    })
  }

  const move = (ev: any, type: string = 'stickDrag', currentStick?: string) => {
    ev.stopPropagation()

    const pageX =
      typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX
    const pageY =
      typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY

    const delta = {
      x: (dimensionsBeforeMove.pointerX - pageX) / props.parentScaleX,
      y: (dimensionsBeforeMove.pointerY - pageY) / props.parentScaleY,
    }

    if (type === 'stickDrag') {
      stickMove(delta, currentStick as string)
    }

    if (type === 'bodyDrag') {
      if (props.axis === 'x') {
        delta.y = 0
      } else if (props.axis === 'y') {
        delta.x = 0
      } else if (props.axis === 'none') {
        return
      }
      bodyMove(delta)
    }
  }

  const calcResizeLimits = () => {
    const { aspectFactor, bottom, top, left, right } = data
    let { minh: minHeight, minw: minWidth } = props

    const parentLim = props.parentLimitation ? 0 : null

    if (props.aspectRatio) {
      if (minWidth / minHeight > aspectFactor) {
        minHeight = minWidth / aspectFactor
      } else {
        minWidth = aspectFactor * minHeight
      }
    }

    const limits = {
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

      if (this.currentStick[0] === 'm') {
        limits.left = {
          min: Math.max(limits.left.min, aspectLimits.left.min),
          max: Math.min(limits.left.max, aspectLimits.left.max),
        }
        limits.right = {
          min: Math.max(limits.right.min, aspectLimits.right.min),
          max: Math.min(limits.right.max, aspectLimits.right.max),
        }
      } else if (this.currentStick[1] === 'm') {
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

  const stickDown = (stick: string, ev: any, force = false) => {
    if (!props.isResizable && !force) {
      return
    }

    stickDrag.value = true

    const pointerX =
      typeof ev.pageX !== 'undefined' ? ev.pageX : ev.touches[0].pageX
    const pointerY =
      typeof ev.pageY !== 'undefined' ? ev.pageY : ev.touches[0].pageY

    saveDimensionsBeforeMove({ pointerX, pointerY })

    Object.assign(limits, calcResizeLimits())
  }

  const stickUp = () => {
    stickDrag.value = false
    Object.assign(dimensionsBeforeMove, {
      pointerX: 0,
      pointerY: 0,
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    })

    Object.assign(limits, {
      left: { min: null, max: null },
      right: { min: null, max: null },
      top: { min: null, max: null },
      bottom: { min: null, max: null },
    })

    emit('resizing', rect.value)
    emit('resizestop', rect.value)
  }

  onMounted(() => {
    const parentElement = target.value?.parentNode as HTMLElement
    const containerElement = container.value as HTMLElement
    data.parentWidth = props.parentW ? props.parentW : parentElement.clientWidth
    data.parentHeight = props.parentH
      ? props.parentH
      : parentElement.clientHeight

    data.left = props.x
    data.top = props.y
    data.right =
      data.parentWidth -
      ((props.w === 'auto'
        ? containerElement.scrollWidth
        : props.w) as number) -
      data.left
    data.bottom =
      data.parentHeight -
      ((props.h === 'auto'
        ? containerElement.scrollHeight
        : props.h) as number) -
      data.top
  })

  return {
    active,
    rect,
    sizeStyle,
    vdrStick,
    positionStyle,
    move,
    stickDown,
    stickUp,
    bodyDown,
    bodyUp,
  }
}
