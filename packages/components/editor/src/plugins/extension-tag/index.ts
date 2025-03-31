import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './tag.vue'

export default Node.create({
  name: 'tag',

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
      text: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'tag',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['tag', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return VueNodeViewRenderer(Component as any)
  },
})
