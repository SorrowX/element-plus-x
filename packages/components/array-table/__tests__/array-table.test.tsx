import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ArrayTable from '../src/array-table.vue'

const AXIOM = 'Rem is the best girl'

describe('ArrayTable.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ArrayTable>{AXIOM}</ArrayTable>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
