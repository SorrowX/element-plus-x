import { createIconComponent } from '@element-plus/components/icons-vue/helper'

export const videoPlayerSvg = `<svg t="1747703634008" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12536" width="200" height="200"><path d="M512 1024C229.2352 1024 0 794.7648 0 512S229.2352 0 512 0s512 229.2352 512 512-229.2352 512-512 512z m163.6864-501.4272a12.8 12.8 0 0 0 0-21.1456L429.6064 333.6448a12.8 12.8 0 0 0-20.0064 10.5728v335.5648a12.8 12.8 0 0 0 20.0064 10.5728l246.08-167.7824z" p-id="12537"></path></svg>`

export default createIconComponent({
  name: 'VideoPlayer',
  svg: videoPlayerSvg,
})
