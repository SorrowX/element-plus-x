import { h, render } from 'vue'
import ElVideoViewer from '@element-plus/components/video-viewer'
import type { VideoViewerProps } from '@element-plus/components/video-viewer'

export const previewVideo = (options: Partial<VideoViewerProps>) => {
  const container = document.createElement('div')

  const vnode = h(ElVideoViewer, {
    ...options,
    teleported: true,
    onClose() {
      render(null, container)
    },
  })

  render(vnode, container)
}
