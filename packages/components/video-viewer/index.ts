import { withInstall } from '@element-plus/utils'
import VideoViewer from './src/video-viewer.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElVideoViewer: SFCWithInstall<typeof VideoViewer> =
  withInstall(VideoViewer)
export default ElVideoViewer

export * from './src/video-viewer'
export type { VideoViewerInstance } from './src/instance'
