<template>
  <div
    v-click-outside="handleClickOutside"
    :class="[
      ns.b(),
      border ? ns.m('border') : '',
      resize ? ns.m('resize') : '',
    ]"
    @click="handleClick"
  >
    <div :class="ns.b('prepend')">
      <slot name="prepend" />
    </div>
    <editor-content :class="ns.b('wrapper')" :editor="editor" />
    <div :class="ns.b('append')">
      <slot name="append" />
    </div>
    <span v-if="isWordLimitVisible" :class="ns.e('count')">
      <span :class="ns.e('count-inner')">
        {{ textLength }} / {{ maxLength }}
      </span>
    </span>
    <slot name="character-count" v-bind="{ count: textLength }" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNamespace, ClickOutside as vClickOutside } from 'element-plus'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Mention from '@tiptap/extension-mention'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import Tag from './plugins/tag/index'
import Video from './plugins/video/index'
import Component from './plugins/component/index'
import { useSuggestion } from './mention/suggestion'
import { editorEmits, editorProps } from './editor'
import type { EditorOptions } from '@tiptap/core'
import type {
  EnterValues,
  ISetImageOptions,
  ISetVideOptions,
  InsertContentOptions,
  MentionOption,
} from './types'

defineOptions({
  name: 'ElEditor',
})

const slots = defineSlots<{
  prepend(): any
  append(): any
  header(): any
  content(props: { items: MentionOption[] }): any
  label(props: { item: MentionOption; index: number }): any
  footer(): any
  'character-count'(props: { count: number }): any
}>()

const props = defineProps(editorProps)
const emit = defineEmits(editorEmits)

const ns = useNamespace('editor')

const textLength = ref(0)
const maxLength = computed(() => Number(props.maxlength))
const isWordLimitVisible = computed(() => maxLength.value !== 0)

const { suggestion, hiddenPopup, getVisible } = useSuggestion({
  char: props.prefix,
  options: props.options,
  slots,
})

const handleClickOutside = () => {
  hiddenPopup()
}

const handleClick = () => {
  focus()
}

const setTextLength = () => {
  const richEditor = editor.value
  if (richEditor && (isWordLimitVisible.value || slots['character-count'])) {
    textLength.value = richEditor.storage.characterCount.characters()
  }
}

const focus = () => {
  const richEditor = editor.value
  return richEditor?.commands?.focus()
}

const getHtml = () => {
  const richEditor = editor.value
  return richEditor?.getHTML() ?? ''
}

const getText = () => {
  const richEditor = editor.value
  return richEditor?.getText() ?? ''
}

const insertHtml = (html: string, options?: InsertContentOptions) => {
  const richEditor = editor.value
  richEditor && richEditor.chain().insertContent(html, options).focus().run()
}

const resetHtml = (html: string) => {
  const richEditor = editor.value
  richEditor && richEditor.commands.setContent(html, false)
}

const setImage = (options: ISetImageOptions) => {
  const richEditor = editor.value
  richEditor && richEditor.chain().focus().setImage(options).run()
}

const setVideo = (options: ISetVideOptions) => {
  let attrs = ''
  Object.entries(options).forEach(([key, value]) => {
    attrs += `${key}="${value}" `
  })
  insertHtml(`<video ${attrs}></video>`)
}

const options: Partial<EditorOptions> = {
  extensions: [
    Tag,
    Video,
    Component,
    Underline,
    Link.configure({
      validate: (link) => /^https?:\/\//.test(link),
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Image.configure({
      inline: true,
      allowBase64: false,
      HTMLAttributes: {
        class: 'tiptap-image',
      },
    }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
      },
      orderedList: {
        keepMarks: true,
      },
    }),
    CharacterCount.configure({
      limit: isWordLimitVisible.value ? maxLength.value : null,
    }),
    Mention.configure({
      HTMLAttributes: {
        class: 'tiptap-mention',
      },
      suggestion,
      deleteTriggerWithBackspace: true,
    }),
    Placeholder.configure({
      emptyEditorClass: 'tiptap-placeholder',
      placeholder: props.placeholder,
    }),
    ...props.extensions,
  ],
  content: props.modelValue,
  editable: !props.disabled,
  onUpdate: () => {
    emit(UPDATE_MODEL_EVENT, getHtml())
  },
  editorProps: {
    handleKeyDown(view, event) {
      if (props.disableEnterEmit) return false
      const hasSpecialKey = [event.shiftKey, event.ctrlKey].some((bool) => bool)
      if (!getVisible() && event.key === 'Enter' && !hasSpecialKey) {
        event.preventDefault()
        const values: EnterValues = {
          html: getHtml(),
          text: getText(),
        }
        emit('enter', values)
        return true
      }
      return false
    },
  },
  ...props.editorOptions,
}
const editor: any = useEditor(options)

watch(
  () => props.modelValue,
  (value) => {
    if (!editor.value) return
    setTextLength()
    if (getHtml() === value) return
    resetHtml(value)
  }
)

onMounted(() => {
  setTextLength()
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

defineExpose({
  editor,
  getHtml,
  getText,
  resetHtml,
  insertHtml,
  setImage,
  setVideo,
})
</script>
