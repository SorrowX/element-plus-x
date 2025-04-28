import { buildProps, isObject, isString } from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import type { ExtractPropTypes } from 'vue'
import type { EmoticonListItem, FontEmoticonListItem } from './helper'

const commonProps = {
  modelValue: {
    type: null,
  },
  type: {
    type: String,
    default: 'text',
    values: ['text', 'code', 'image', 'icon'],
  },
  keepAlive: {
    type: Boolean,
    default: true,
  },
}

const commonEmits = {
  [UPDATE_MODEL_EVENT]: (str: string) => isString(str),
  [CHANGE_EVENT]: (
    item: EmoticonListItem | FontEmoticonListItem,
    type: string
  ) => isObject(item) && isString(type),
}

export const emojiProps = buildProps({ ...commonProps } as const)
export type EmojiProps = ExtractPropTypes<typeof emojiProps>

export const emojiEmits = {
  ...commonEmits,
  'click-tab': (tab: string) => !!tab,
}
export type EmojiEmits = typeof emojiEmits

// 表情包 props event
export const emoticonProps = buildProps({
  ...commonProps,
} as const)
export type EmoticonProps = ExtractPropTypes<typeof emoticonProps>

export const emoticonEmits = {
  ...commonEmits,
}
export type EmoticonEmits = typeof emoticonEmits
