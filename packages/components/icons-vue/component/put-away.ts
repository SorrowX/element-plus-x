import { createIconComponent } from '@element-plus/components/icons-vue/helper'

export const putAwaySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" xml:space="preserve"><rect style="fill: none;"></rect><path d="M11.5 0h-7C2 0 0 2 0 4.5v7C0 14 2 16 4.5 16h7c2.5 0 4.5-2 4.5-4.5v-7C16 2 14 0 11.5 0zM15 11.5c0 1.9-1.6 3.5-3.5 3.5h-7C2.6 15 1 13.4 1 11.5v-7C1 2.6 2.6 1 4.5 1h7C13.4 1 15 2.6 15 4.5v7zM11 8c0 .3-.2.5-.5.5h-2v2c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-2h-2c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h2v-2c0-.3.2-.5.5-.5s.5.2.5.5v2h2c.3 0 .5.2.5.5z" style="fill-rule: evenodd; clip-rule: evenodd;"></path></svg>`

export default createIconComponent({
  name: 'PutAway',
  svg: putAwaySvg,
})
