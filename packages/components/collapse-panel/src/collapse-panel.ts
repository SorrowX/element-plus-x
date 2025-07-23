import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const collapsePanelProps = buildProps({
  title: {
    type: definePropType<string>(String),
    default: '',
  },
  // 关闭折叠功能
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  // 默认折叠
  collapse: {
    type: definePropType<boolean>(Boolean),
    default: true,
  },
  // 头部是否含有虚线
  dashed: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
} as const)
export type CollapsePanelProps = ExtractPropTypes<typeof collapsePanelProps>

export const collapsePanelEmits = {
  change: (visible: boolean) => typeof visible === 'boolean',
}
export type CollapsePanelEmits = typeof collapsePanelEmits
