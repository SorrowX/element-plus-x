import { withInstall } from '@element-plus/utils'
import Video from './src/video.vue'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElVideo: SFCWithInstall<typeof Video> = withInstall(Video)
export default ElVideo

export * from './src/video'
export type { VideoInstance } from './src/instance'
