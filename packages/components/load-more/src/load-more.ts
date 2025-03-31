import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const loadMoreProps = buildProps({
  status: {
    type: definePropType<string>(String),
    default: 'more',
    // values: ['more', 'loading', 'noMore', 'error'],
  },
  iconType: {
    type: definePropType<string>(String),
    default: 'snow',
    values: ['snow', 'circle'],
  },
  color: {
    type: definePropType<string>(String),
  },
  textColor: {
    type: definePropType<string>(String),
  },
  iconSize: {
    type: definePropType<string | number>([String, Number]),
    default: 16,
  },
  moreText: {
    type: definePropType<string>(String),
  },
  loadingText: {
    type: definePropType<string>(String),
  },
  noMoreText: {
    type: definePropType<string>(String),
  },
  errorText: {
    type: definePropType<string>(String),
  },
  height: {
    type: definePropType<string | number>([String, Number]),
    default: '36',
  },
} as const)
export type LoadMoreProps = ExtractPropTypes<typeof loadMoreProps>

export const loadMoreEmits = {
  click: (status: string) => !!status,
}
export type LoadMoreEmits = typeof loadMoreEmits
