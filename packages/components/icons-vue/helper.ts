import { defineComponent, h } from 'vue'

export type IOptions = {
  name: string
  svg: string
}

export const createIconComponent = (options: IOptions) => {
  return defineComponent({
    name: options.name,
    render() {
      return h('div', {
        style: {
          display: 'contents',
        },
        innerHTML: options.svg,
      })
    },
  })
}
