import { buildProps, isObject } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const textEllipsisProps = buildProps({
  rows: {
    type: [Number, String],
    default: 1,
  },
  dots: {
    type: String,
    default: '...',
  },
  content: {
    type: String,
    default: '',
  },
  expandText: {
    type: String,
    default: '',
  },
  collapseText: {
    type: String,
    default: '',
  },
  position: {
    type: String,
    default: 'end',
    values: ['start', 'middle', 'end'],
  },
  showOverflowTooltip: {
    type: Boolean,
    default: false,
  },
  tooltipOptions: {
    type: Object,
    default: () => ({}),
  },
} as const)
export type TextEllipsisProps = ExtractPropTypes<typeof textEllipsisProps>

export const textEllipsisEmits = {
  clickAction: (event: MouseEvent) => isObject(event),
}
export type TextEllipsisEmits = typeof textEllipsisEmits
