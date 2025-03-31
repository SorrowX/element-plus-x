import { h, render } from 'vue'
import { ElImageViewer } from 'element-plus'
import type { ImageViewerProps } from 'element-plus'

export const previewImage = (options: Partial<ImageViewerProps>) => {
  const container = document.createElement('div')

  const vnode = h(ElImageViewer, {
    ...options,
    teleported: true,
    onClose() {
      render(null, container)
    },
  })

  render(vnode, container)
}
