import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ArrayItems from '../src/array-items.vue'

const AXIOM = 'Rem is the best girl'

describe('ArrayItems.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ArrayItems>{AXIOM}</ArrayItems>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
