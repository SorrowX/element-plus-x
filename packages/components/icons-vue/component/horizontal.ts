import { createIconComponent } from '@element-plus/components/icons-vue/helper'

export const horizontalSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
</svg>`

export default createIconComponent({
  name: 'Horizontal',
  svg: horizontalSvg,
})
