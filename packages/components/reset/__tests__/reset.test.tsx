import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Reset from '../src/reset.vue'

const AXIOM = 'Rem is the best girl'

describe('Reset.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Reset>{AXIOM}</Reset>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
