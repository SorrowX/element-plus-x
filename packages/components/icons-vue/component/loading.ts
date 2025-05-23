import { createIconComponent } from '@element-plus/components/icons-vue/helper'

export const loadingSvg = `<svg t="1741942448095" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3545" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 960C265.6 960 64 758.4 64 512c0-19.2 12.8-32 32-32s32 12.8 32 32c0 211.2 172.8 384 384 384s384-172.8 384-384S723.2 128 512 128c-19.2 0-32-12.8-32-32s12.8-32 32-32c246.4 0 448 201.6 448 448s-201.6 448-448 448z" p-id="3546"></path></svg>
`

export default createIconComponent({
  name: 'Loading',
  svg: loadingSvg,
})
