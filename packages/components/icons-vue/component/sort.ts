import { createIconComponent } from '@element-plus/components/icons-vue/helper'

export const sortSvg = `<svg t="1740203742959" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2598" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M96 256l832 0c19.2 0 32-12.8 32-32s-12.8-32-32-32L96 192C76.8 192 64 204.8 64 224S76.8 256 96 256z" p-id="2599"></path><path d="M928 480 96 480c-19.2 0-32 12.8-32 32s12.8 32 32 32l832 0c19.2 0 32-12.8 32-32S947.2 480 928 480z" p-id="2600"></path><path d="M928 768 96 768c-19.2 0-32 12.8-32 32s12.8 32 32 32l832 0c19.2 0 32-12.8 32-32S947.2 768 928 768z" p-id="2601"></path></svg>`

export default createIconComponent({
  name: 'Sort',
  svg: sortSvg,
})
