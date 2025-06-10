<template>
  <div v-if="editor" :class="ns.b()">
    <slot name="prepend" />
    <template v-for="key in toolbarList" :key="key">
      <template v-if="key === 'emoji'">
        <ElEmoji @change="insertImage">
          <template #trigger>
            <el-tooltip
              effect="light"
              placement="top"
              :disabled="!showTip"
              :content="getCommandItem(key).tip"
            >
              <Icon
                :icon="getValueByKey(key, 'icon')"
                :size="getValueByKey(key, 'size')"
              />
            </el-tooltip>
          </template>
        </ElEmoji>
      </template>
      <template v-else-if="key === 'image'">
        <Image />
      </template>
      <template v-else-if="key === 'video'">
        <Video />
      </template>
      <template v-else-if="key === 'link'">
        <Link />
      </template>
      <template v-else-if="key === 'divider'">
        <ElDivider :class="ns.e('divider')" direction="vertical" />
      </template>
      <template v-else-if="key === 'heading'">
        <Heading />
      </template>
      <template v-else-if="key === 'font-size'">
        <FontSize />
      </template>
      <template v-else>
        <el-tooltip
          effect="light"
          placement="top"
          :disabled="!showTip"
          :content="getCommandItem(key).tip"
        >
          <Icon
            :active="isActive(key)"
            :icon="getValueByKey(key, 'icon')"
            :size="getValueByKey(key, 'size')"
            @click="handleClick(key)"
          />
        </el-tooltip>
      </template>
    </template>
    <slot name="append" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElDivider, ElTooltip, useLocale, useNamespace } from 'element-plus'
import { definePropType, isFunction } from '@element-plus/utils'
import { ElEmoji } from '@element-plus/components/emoji'
import * as IconsVue from '@element-plus/components/icons-vue/index'
import { provideToolBarContext } from '../hooks'
import Icon from './icon.vue'
import Image from './image/index.vue'
import Video from './video/index.vue'
import Link from './link/index.vue'
import Heading from './heading/index.vue'
import FontSize from './font-size/index.vue'
import type { Component, ComputedRef } from 'vue'
import type { IEditor, IToolbarConfigure, IToolbarList } from '../types'

const {
  Bold,
  Italic,
  Bullet,
  Ordered,
  Blockquote,
  Code,
  Strike,
  Undo,
  Redo,
  Emoji,
  Underline,
  Horizontal,
  AlignLeft,
  AlignRight,
  AlignCenter,
  AlignJustify,
} = IconsVue

const ns = useNamespace('editor-toolbar')
const { t } = useLocale()

defineOptions({
  name: 'ElEditorToolbar',
})

const props = defineProps({
  editor: {
    type: definePropType<IEditor>(Object),
    required: true,
  },
  toolbarList: {
    type: definePropType<IToolbarList>(Array),
    default: () => [
      'bold', // 加粗
      'strike', // 删除线
      'italic', // 斜体
      'underline', // 下划线
      'link', // 链接
      'ordered', // 有序列表
      'bullet', // 无序列表
      'blockquote', // 引用
      'code', // 代码块
      'horizontal', // 分割线
      'alignLeft', // 左对齐
      'alignRight', // 右对齐
      'alignCenter', // 居中对齐
      'alignJustify', // 两端对齐
      'emoji', // 表情
      'image', // 图片
      'video', // 视频
      'undo', // 撤销
      'redo', // 重做
      'heading', // head大小
      'font-size', // 字体大小
    ],
  },
  configure: {
    type: definePropType<IToolbarConfigure>(Object),
    default: () => ({}),
  },
})

const toolBarContext = computed(() => {
  return {
    editor: props.editor,
    configure: props.configure,
  }
})

const showTip = computed(() => toolBarContext.value.configure.showTip)

provideToolBarContext(toolBarContext)

const getEditor = () => {
  return props.editor as any
}

type ICommandOption = {
  type: string
  icon: Component
  command: () => void
  isActive: () => boolean
  size: number
  tip: string
  [key: string]: any
}

type ICommands = {
  [key: string]: ICommandOption
}

const commands: ComputedRef<ICommands> = computed(() => ({
  bold: {
    type: 'bold',
    icon: Bold,
    command: () => getEditor().chain().focus().toggleBold().run(),
    isActive: () => getEditor().isActive('bold'),
    size: 18,
    tip: t('epx.editor.boldTip'),
  },
  italic: {
    type: 'italic',
    icon: Italic,
    command: () => getEditor().chain().focus().toggleItalic().run(),
    isActive: () => getEditor().isActive('italic'),
    size: 18,
    tip: t('epx.editor.italicTip'),
  },
  bullet: {
    type: 'bulletList',
    icon: Bullet,
    command: () => getEditor().chain().focus().toggleBulletList().run(),
    isActive: () => getEditor().isActive('bulletList'),
    size: 21,
    tip: t('epx.editor.bulletTip'),
  },
  ordered: {
    type: 'orderedList',
    icon: Ordered,
    command: () => getEditor().chain().focus().toggleOrderedList().run(),
    isActive: () => getEditor().isActive('orderedList'),
    size: 21,
    tip: t('epx.editor.orderedTip'),
  },
  blockquote: {
    type: 'blockquote',
    icon: Blockquote,
    command: () => getEditor().chain().focus().toggleBlockquote().run(),
    isActive: () => getEditor().isActive('blockquote'),
    size: 18,
    tip: t('epx.editor.blockquoteTip'),
  },
  code: {
    type: 'codeBlock',
    icon: Code,
    command: () => getEditor().chain().focus().toggleCodeBlock().run(),
    isActive: () => getEditor().isActive('codeBlock'),
    size: 21,
    tip: t('epx.editor.codeTip'),
  },
  strike: {
    type: 'strike',
    icon: Strike,
    command: () => getEditor().chain().focus().toggleStrike().run(),
    isActive: () => getEditor().isActive('strike'),
    size: 18,
    tip: t('epx.editor.strikeTip'),
  },
  undo: {
    type: 'undo',
    icon: Undo,
    command: () => getEditor().chain().focus().undo().run(),
    isActive: () => false,
    size: 18,
    tip: t('epx.editor.undoTip'),
  },
  redo: {
    type: 'redo',
    icon: Redo,
    command: () => getEditor().chain().focus().redo().run(),
    isActive: () => false,
    size: 18,
    tip: t('epx.editor.redoTip'),
  },
  emoji: {
    type: 'emoji',
    icon: Emoji,
    command: () => {},
    isActive: () => false,
    size: 21,
    tip: t('epx.editor.emojiTip'),
  },
  underline: {
    type: 'underline',
    icon: Underline,
    command: () => getEditor().chain().focus().toggleUnderline().run(),
    isActive: () => getEditor().isActive('underline'),
    size: 17,
    tip: t('epx.editor.underlineTip'),
  },
  horizontal: {
    type: 'horizontal',
    icon: Horizontal,
    command: () => getEditor().chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    size: 21,
    tip: t('epx.editor.horizontalTip'),
  },
  alignLeft: {
    type: 'alignLeft',
    icon: AlignLeft,
    command: () => {
      if (commands.value.alignLeft.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('left').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'left' }),
    size: 21,
    tip: t('epx.editor.alignLeftTip'),
  },
  alignRight: {
    type: 'alignRight',
    icon: AlignRight,
    command: () => {
      if (commands.value.alignRight.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('right').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'right' }),
    size: 21,
    tip: t('epx.editor.alignRightTip'),
  },
  alignCenter: {
    type: 'alignCenter',
    icon: AlignCenter,
    command: () => {
      if (commands.value.alignCenter.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('center').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'center' }),
    size: 21,
    tip: t('epx.editor.alignCenterTip'),
  },
  alignJustify: {
    type: 'alignJustify',
    icon: AlignJustify,
    command: () => {
      if (commands.value.alignJustify.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('justify').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'justify' }),
    size: 21,
    tip: t('epx.editor.alignJustifyTip'),
  },
}))

const getCommandItem = (key: string) => commands.value[key]

const handleClick = (key: string) => {
  const item = commands.value[key]
  item.command()
}

const isActive = (key: string) => {
  const item = commands.value[key]
  return item.isActive()
}

const getValueByKey = (key: string, prop: string) => {
  const item = commands.value[key]
  return isFunction(item[prop]) ? item[prop]() : item[prop]
}

const insertImage = (item: any) => {
  getEditor()
    .chain()
    .focus()
    .setImage({
      src: item.image,
      alt: item.text,
    })
    .run()
}
</script>
