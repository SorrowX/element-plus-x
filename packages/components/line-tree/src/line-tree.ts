import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const lineTreeProps = buildProps({
  // 设置线的弧度，默认直角
  lineRadius: {
    type: definePropType<string>(String),
    default: '0px',
  },
  // 设置线的颜色
  lineColor: {
    type: definePropType<string>(String),
    default: 'rgba(158, 158, 158, 1)',
  },
  // 当自定义collapse内容时，需要设置collapse的宽度值，为了调整连线的位置
  collapseWidth: {
    type: definePropType<string>(String),
    default: '16px',
  },
  // 自定义content后，子内容的高度可能变化，添加一条线会更好
  showContentLine: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
} as const)
export type LineTreeProps = ExtractPropTypes<typeof lineTreeProps>

export const lineTreeEmits = {}
export type LineTreeEmits = typeof lineTreeEmits
