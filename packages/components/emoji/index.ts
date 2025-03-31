import { withInstall } from '@element-plus/utils'
import Emoji from './src/index.vue'
import Emoticon from './src/emoticon.vue'
import FontEmoticon from './src/font-emoticon.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElEmoji: SFCWithInstall<typeof Emoji> = withInstall(Emoji)
export default ElEmoji

export const ElEmoticon: SFCWithInstall<typeof Emoticon> = withInstall(Emoticon)

export const ElFontEmoticon: SFCWithInstall<typeof FontEmoticon> =
  withInstall(FontEmoticon)

export * from './src/emoji'
export * from './src/helper'
export * from './src/trie'
export type { EmojiInstance } from './src/instance'
