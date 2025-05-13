import { buildProps, definePropType } from '@element-plus/utils'
import type { AvatarProps } from 'element-plus'
import type { ExtractPropTypes, StyleValue, VNode } from 'vue'

export interface TypingOption {
  /**
   * @default 1
   */
  step?: number
  /**
   * @default 50
   */
  interval?: number
  /**
   * @default null
   */
  suffix?: VNode | string | null
}

export type SemanticType = 'avatar' | 'content' | 'header' | 'footer'

export interface BubbleContextProps {
  onUpdate?: VoidFunction
}

export interface BubbleRef {
  nativeElement: HTMLElement
}

export type AvatarPropsType = AvatarProps & {
  style?: StyleValue
  class?: string
}

export const bubbleProps = buildProps({
  avatar: {
    type: definePropType<Partial<AvatarPropsType | boolean> | VNode>([
      Object,
      Boolean,
    ]),
  },
  placement: {
    type: definePropType<'start' | 'end'>(String),
    default: 'start',
    values: ['start', 'end'],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  typing: {
    type: definePropType<boolean | TypingOption>([Boolean, Object]),
  },
  messageRender: {
    type: definePropType<(content: any) => VNode | string>(Function),
  },
  loadingRender: {
    type: definePropType<() => VNode>(Function),
  },
  variant: {
    type: definePropType<'filled' | 'borderless' | 'outlined' | 'shadow'>(
      String
    ),
    default: 'filled',
    values: ['filled', 'borderless', 'outlined', 'shadow'],
  },
  shape: {
    type: definePropType<'round' | 'corner' | 'arrow'>(String),
    values: ['round', 'corner', 'arrow'],
  },
  onTypingComplete: {
    type: definePropType<VoidFunction>(Function),
  },
  header: {
    type: definePropType<VNode | string>([Object, String]),
  },
  content: {
    type: definePropType<VNode | object | string>([Object, String]),
  },
  footer: {
    type: definePropType<VNode | string>([Object, String]),
  },
  headerStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
  },
  headerClass: {
    type: String,
  },
  contentStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
  },
  contentClass: {
    type: String,
  },
  footerStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
  },
  footerClass: {
    type: String,
  },
} as const)
export type BubbleProps = ExtractPropTypes<typeof bubbleProps>

export const bubbleEmits = {}
export type BubbleEmits = typeof bubbleEmits
