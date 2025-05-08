import { Node, mergeAttributes } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import Component from './tag.vue'

export default Node.create({
  name: 'tag',

  group: 'inline',

  inline: true,

  addAttributes() {
    return {
      props: {
        default: null,
        parseHTML: (element) => {
          const attributes: Record<string, string> = {}
          for (const attr of element.attributes) {
            attributes[attr.name] = attr.value
          }
          return attributes
        },
        renderHTML: (attributes) => {
          return attributes.props || {}
        },
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
