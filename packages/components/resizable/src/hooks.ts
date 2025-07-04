import { computed, onMounted, reactive, ref } from 'vue'
import { ResizableProps } from './resizable'
import type { Ref } from 'vue'

export const useResizable = (
  target: Ref<HTMLElement | null> = ref(null),
  container: Ref<HTMLElement | null> = ref(null),
  props: ResizableProps
) => {
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
  })

  const dimensionsBeforeMove = reactive({
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
      (props.w === 'auto' ? containerElement.scrollWidth : props.w) -
      data.left
    data.bottom =
      data.parentHeight -
      (props.h === 'auto' ? containerElement.scrollHeight : props.h) -
      data.top
  })

  return {
    sizeStyle,
    positionStyle,
    rect,
  }
}
