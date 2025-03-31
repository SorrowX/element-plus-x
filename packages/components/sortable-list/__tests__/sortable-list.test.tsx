import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SortableList from '../src/sortable-list.vue'

const AXIOM = 'Rem is the best girl'

describe('SortableList.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <SortableList>{AXIOM}</SortableList>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
