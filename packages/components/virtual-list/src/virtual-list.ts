import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes } from 'vue'

export type ItemSize = number

export const virtualListProps = buildProps({
  list: {
    type: definePropType<any[]>(Array),
    default: () => [],
  },
  itemFixed: {
    type: Boolean,
    default: false,
  },
  itemSize: {
    type: definePropType<ItemSize>(Number),
    default: 20,
  },
  direction: {
    type: String,
    default: 'vertical',
    values: ['vertical', 'horizontal'],
  },
  overscan: {
    type: Number,
    default: 10,
  },
  nativeScrollbar: {
    type: Boolean,
    default: false,
  },
  infiniteScroll: {
    type: definePropType<() => void>(Function),
  },
  infiniteScrollup: {
    type: definePropType<() => void>(Function),
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
export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>

export const virtualListEmits = {
  scroll: (e: Event) => !!e,
}
export type VirtualListEmits = typeof virtualListEmits
