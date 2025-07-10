import { buildProps, definePropType } from '@element-plus/utils'
import { sticks } from './types'
import type { ExtractPropTypes } from 'vue'
import type { IRect, IStick } from './types'

export const resizableProps = buildProps({
  // 确定组件是否应可拖动
  isDraggable: {
    type: definePropType<boolean>(Boolean),
    default: true,
  },
  // 自定义组件局部元素可拖动
  isCustomDraggable: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  // 确定组件是否应调整大小
  isResizable: {
    type: definePropType<boolean>(Boolean),
    default: true,
  },
  // 确定组件是否应保持其比例
  aspectRatio: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  // 将组件更改的范围限制为其父大小
  parentLimitation: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  // 确定组件是否应按预定义的步长移动和调整大小。
  snapToGrid: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  // 定义水平轴的网格步长。组件的两侧（左侧和右侧）将跳到此步骤。
  gridX: {
    type: definePropType<number>(Number),
    default: 50,
    validator(val) {
      return val >= 0
    },
  },
  // 定义垂直轴的网格步长。组件的两侧（顶部和底部）将捕捉到此步骤。
  gridY: {
    type: definePropType<number>(Number),
    default: 50,
    validator(val) {
      return val >= 0
    },
  },
  // 定义父元素的初始宽度。 如果未指定，则自动计算。使用此参数，您可以设置组件的边界区域，并在实时调整大小时使用它。
  parentW: {
    type: definePropType<number>(Number),
    default: 0,
    validator(val) {
      return val >= 0
    },
  },
  // 定义父元素的初始高度。 如果未指定，则自动计算。 使用此参数，您可以设置组件的边界区域，并在实时调整大小时使用它。
  parentH: {
    type: definePropType<number>(Number),
    default: 0,
    validator(val) {
      return val >= 0
    },
  },
  // 定义组件的初始宽度。
  w: {
    type: definePropType<string | number>([String, Number]),
    default: 200,
    validator(val) {
      return typeof val === 'string' ? val === 'auto' : val >= 0
    },
  },
  // 定义组件的初始高度。
  h: {
    type: definePropType<string | number>([String, Number]),
    default: 200,
    validator(val) {
      return typeof val === 'string' ? val === 'auto' : val >= 0
    },
  },
  // 定义组件的最小宽度。
  minw: {
    type: definePropType<number>(Number),
    default: 50,
    validator(val) {
      return val >= 0
    },
  },
  // 定义组件的最小高度。
  minh: {
    type: definePropType<number>(Number),
    default: 50,
    validator(val) {
      return val >= 0
    },
  },
  // 定义组件的初始X位置。
  x: {
    type: definePropType<number>(Number),
    default: 0,
    validator(val) {
      return typeof val === 'number'
    },
  },
  // 定义组件的初始Y位置。
  y: {
    type: definePropType<number>(Number),
    default: 0,
    validator(val) {
      return typeof val === 'number'
    },
  },
  // 定义组件的zindex(层级)。
  z: {
    type: definePropType<string | number>([String, Number]),
    default: 'auto',
    validator(val) {
      return typeof val === 'string' ? val === 'auto' : val >= 0
    },
  },
  /**
   * 定义句柄数组以限制元素大小调整
      tl - Top left 上左
      tm - Top middle 上
      tr - Top right 上右
      mr - Middle right 右
      br - Bottom right 下右
      bm - Bottom middle 下
      bl - Bottom left 下左
      ml - Middle left 左
   */
  sticks: {
    type: definePropType<IStick[]>(Array),
    default() {
      return sticks
    },
  },
  // 定义元素可拖动的轴。 可用值为x，y，both或none。
  axis: {
    type: definePropType<string>(String),
    default: 'both',
    validator(val) {
      return ['x', 'y', 'both', 'none'].includes(val)
    },
  },
  // 定义初始水平比例或父元素。父级的transform:scale（）css定义中的值相同。 拖动/调整大小和杆的大小将使用该值计算。
  parentScaleX: {
    type: definePropType<number>(Number),
    default: 1,
  },
  // 定义初始垂直比例或父元素。父级的transform:scale（）css定义中的值相同。拖动/调整大小和杆的大小将使用该值计算。
  parentScaleY: {
    type: definePropType<number>(Number),
    default: 1,
  },
} as const)
export type ResizableProps = ExtractPropTypes<typeof resizableProps>

export const resizableEmits = {
  'drag-start': (rect: IRect, evt: PointerEvent) => !!rect && !!evt,
  drag: (rect: IRect, evt: PointerEvent) => !!rect && !!evt,
  'drag-end': (rect: IRect, evt: PointerEvent) => !!rect && !!evt,

  'resize-start': (rect: IRect, evt: PointerEvent) => !!rect && !!evt,
  resize: (rect: IRect, evt: PointerEvent) => !!rect && !!evt,
  'resize-end': (rect: IRect, evt: PointerEvent) => !!rect && !!evt,
}
export type ResizableEmits = typeof resizableEmits
