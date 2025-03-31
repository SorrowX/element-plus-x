import { buildProps, definePropType } from '@element-plus/utils'
import type { BubbleProps } from '../bubble/bubble'
import type { ExtractPropTypes, StyleValue } from 'vue'

export interface BubbleListRef {
  nativeElement: HTMLDivElement
  scrollTo: (info: {
    offset?: number
    key?: string | number
    behavior?: ScrollBehavior
    block?: ScrollLogicalPosition
  }) => void
}

export type BubbleDataType = Partial<BubbleProps> & {
  key?: string | number
  role?: string
}

export type RoleType = Partial<Omit<BubbleProps, 'content'>> & {
  style?: StyleValue
  class?: string
}

export type RolesType =
  | Record<string, RoleType>
  | ((bubbleDataP: BubbleDataType) => RoleType)

export const bubbleListProps = buildProps({
  autoScroll: {
    type: Boolean,
    default: true,
  },
  items: {
    type: definePropType<BubbleDataType[]>(Array),
    default: () => [],
  },
  roles: {
    type: definePropType<RolesType>([Object, Function]),
  },
  onLastBubbleTypingComplete: {
    type: definePropType<(key: string | number) => void>(Function),
  },
} as const)

export type BubbleListProps = ExtractPropTypes<typeof bubbleListProps>

export const bubbleListEmits = {}

export type BubbleListEmits = typeof bubbleListEmits
