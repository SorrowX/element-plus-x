import { buildProps, definePropType } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export type ItemType = any

export const listProps = buildProps({
  list: {
    type: definePropType<ItemType[]>(Array),
    default: () => [],
  },
  nativeScrollbar: {
    type: Boolean,
    default: false,
  },
  infiniteScrollDisabled: {
    type: Boolean,
    default: false,
  },
  infiniteScrollDelay: {
    type: Number,
    default: 16,
  },
  infiniteScrollDistance: {
    type: Number,
    default: 20,
  },
  load: {
    type: definePropType<() => Promise<any>>(Function),
  },
  preLoad: {
    type: definePropType<() => Promise<any>>(Function),
  },
  finished: {
    type: Boolean,
    default: false,
  },
  loadingText: {
    type: String,
  },
  errorText: {
    type: String,
  },
  noMoreText: {
    type: String,
  },
} as const)
export type ListProps = ExtractPropTypes<typeof listProps>

export const listEmits = {}
export type ListEmits = typeof listEmits
