<template>
  <div v-if="editor" :class="ns.b()">
    <slot name="prepend" />
    <template v-for="key in toolbarList" :key="key">
      <template v-if="key === 'emoji'">
        <ElEmoji @change="insertImage">
          <template #trigger>
            <Icon
              :icon="getValueByKey(key, 'icon')"
              :size="getValueByKey(key, 'size')"
            />
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
        <Icon
          :active="isActive(key)"
          :icon="getValueByKey(key, 'icon')"
          :size="getValueByKey(key, 'size')"
          @click="handleClick(key)"
        />
      </template>
    </template>
    <slot name="append" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElDivider, useNamespace } from 'element-plus'
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
  Image: ImageIcon,
} = IconsVue

const ns = useNamespace('editor-toolbar')

defineOptions({
  name: 'ElEditorToolbar',
  // inheritAttrs: false,
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
      'alignCenter', // 居中对象
      'alignJustify', // 两端对齐
      'emoji', // 表情
      'image', // 图片
      'video', // 视频
      'undo', // 撤销
      'redo', // 重做
      'heading', // 字体大小
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

provideToolBarContext(toolBarContext)

const getEditor = () => {
  return props.editor as any
}

const commands: any = {
  bold: {
    type: 'bold',
    icon: Bold,
    command: () => getEditor().chain().focus().toggleBold().run(),
    isActive: () => getEditor().isActive('bold'),
    size: 18,
  },
  italic: {
    type: 'italic',
    icon: Italic,
    command: () => getEditor().chain().focus().toggleItalic().run(),
    isActive: () => getEditor().isActive('italic'),
    size: 18,
  },
  bullet: {
    type: 'bulletList',
    icon: Bullet,
    command: () => getEditor().chain().focus().toggleBulletList().run(),
    isActive: () => getEditor().isActive('bulletList'),
    size: 21,
  },
  ordered: {
    type: 'orderedList',
    icon: Ordered,
    command: () => getEditor().chain().focus().toggleOrderedList().run(),
    isActive: () => getEditor().isActive('orderedList'),
    size: 21,
  },
  blockquote: {
    type: 'blockquote',
    icon: Blockquote,
    command: () => getEditor().chain().focus().toggleBlockquote().run(),
    isActive: () => getEditor().isActive('blockquote'),
    size: 18,
  },
  code: {
    type: 'codeBlock',
    icon: Code,
    command: () => getEditor().chain().focus().toggleCodeBlock().run(),
    isActive: () => getEditor().isActive('codeBlock'),
    size: 21,
  },
  strike: {
    type: 'strike',
    icon: Strike,
    command: () => getEditor().chain().focus().toggleStrike().run(),
    isActive: () => getEditor().isActive('strike'),
    size: 18,
  },
  undo: {
    type: 'undo',
    icon: Undo,
    command: () => getEditor().chain().focus().undo().run(),
    isActive: () => false,
    size: 18,
  },
  redo: {
    type: 'redo',
    icon: Redo,
    command: () => getEditor().chain().focus().redo().run(),
    isActive: () => false,
    size: 18,
  },
  emoji: {
    type: 'emoji',
    icon: Emoji,
    command: () => getEditor().chain().focus().redo().run(),
    isActive: () => false,
    size: 21,
  },
  underline: {
    type: 'underline',
    icon: Underline,
    command: () => getEditor().chain().focus().toggleUnderline().run(),
    isActive: () => getEditor().isActive('underline'),
    size: 17,
  },
  horizontal: {
    type: 'horizontal',
    icon: Horizontal,
    command: () => getEditor().chain().focus().setHorizontalRule().run(),
    isActive: () => false,
    size: 21,
  },
  alignLeft: {
    type: 'alignLeft',
    icon: AlignLeft,
    command: () => {
      if (commands.alignLeft.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('left').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'left' }),
    size: 21,
  },
  alignRight: {
    type: 'alignRight',
    icon: AlignRight,
    command: () => {
      if (commands.alignRight.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('right').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'right' }),
    size: 21,
  },
  alignCenter: {
    type: 'alignCenter',
    icon: AlignCenter,
    command: () => {
      if (commands.alignCenter.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('center').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'center' }),
    size: 21,
  },
  alignJustify: {
    type: 'alignJustify',
    icon: AlignJustify,
    command: () => {
      if (commands.alignJustify.isActive()) {
        getEditor().chain().focus().unsetTextAlign().run()
      } else {
        getEditor().chain().focus().setTextAlign('justify').run()
      }
    },
    isActive: () => getEditor().isActive({ textAlign: 'justify' }),
    size: 21,
  },
  image: {
    type: 'image',
    icon: ImageIcon,
    command: () => getEditor().chain().focus().undo().run(),
    isActive: () => false,
    size: 21,
  },
}

const handleClick = (key: string) => {
  const item = commands[key]
  item.command()
}

const isActive = (key: string) => {
  const item = commands[key]
  return item.isActive()
}

const getValueByKey = (key: string, prop: string) => {
  const item = commands[key]
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
