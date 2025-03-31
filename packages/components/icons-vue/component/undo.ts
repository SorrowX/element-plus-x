import { createIconComponent } from '@element-plus/components/icons-vue/helper'

export const undoSvg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
</svg>`

export default createIconComponent({
  name: 'Undo',
  svg: undoSvg,
})
