import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TableDialog from '../src/table-dialog.vue'

const AXIOM = 'Rem is the best girl'

describe('TableDialog.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TableDialog>{AXIOM}</TableDialog>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
