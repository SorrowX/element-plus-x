import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './video.vue'

export default Node.create({
  name: 'video',

  group: 'inline',

  inline: true,

  addAttributes() {
    return {
      id: {
        default: '',
      },
      class: {
        default: '',
      },
      src: {
        default: '',
      },
      controls: {
        default: true,
      },
      autoplay: {
        default: false,
      },
      loop: {
        default: false,
      },
      muted: {
        default: false,
      },
      poster: {
        default: '',
      },
      width: {
        default: 200,
      },
      height: {
        default: '',
      },
      preload: {
        default: 'auto',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'video',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['video', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component as any)
  },
})
