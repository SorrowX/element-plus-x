import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TablePage from '../src/table-page.vue'

const AXIOM = 'Rem is the best girl'

describe('TablePage.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TablePage>{AXIOM}</TablePage>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
