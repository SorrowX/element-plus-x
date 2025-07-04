import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

export const resizableProps = buildProps({
  // 定义sticks的大小
  stickSize: {
    type: definePropType<number>(Number),
    default: 8,
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
  // 确定组件是否应处于活动状态
  isActive: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  // 通过单击组件并单击组件区域外部来禁用组件的行为（isActive：true / false）。如果启用了prop，则组件仅面向指定的。
  preventActiveBehavior: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  // 确定组件是否应可拖动
  isDraggable: {
    type: definePropType<boolean>(Boolean),
    default: true,
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
  // 定义应该用于拖动组件的选择器。
  dragHandle: {
    type: definePropType<string>(String),
  },
  // 定义应该用于防止拖动初始化的选择器。
  dragCancel: {
    type: definePropType<string>(String),
  },
  /**
   * 定义句柄数组以限制元素大小调整
      tl - Top left
      tm - Top middle
      tr - Top right
      mr - Middle right
      br - Bottom right
      bm - Bottom middle
      bl - Bottom left
      ml - Middle left
   */
  sticks: {
    type: definePropType<string[]>(Array),
    default() {
      return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
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
  // 定义容器的class类名
  contentClass: {
    type: definePropType<string>(String),
    required: false,
    default: '',
  },
} as const)
export type ResizableProps = ExtractPropTypes<typeof resizableProps>

export const resizableEmits = {
  clicked: (evt: MouseEvent) => !!evt,
}
export type ResizableEmits = typeof resizableEmits
