import { createIconComponent } from '@element-plus/components/icons-vue/helper'

export const italicSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.825 5.077 11.19 18.923h4.052a1.038 1.038 0 1 1 0 2.077H4.954a1.038 1.038 0 1 1 0-2.077h4.053l3.636-13.846H8.591A1.038 1.038 0 1 1 8.59 3h10.287a1.038 1.038 0 0 1 0 2.077h-4.053Z" fill="currentColor"></path></svg>`

export default createIconComponent({
  name: 'Italic',
  svg: italicSvg,
})
