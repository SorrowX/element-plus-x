import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Bubble from '../src/bubble.vue'

const AXIOM = 'Rem is the best girl'

describe('Bubble.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Bubble>{AXIOM}</Bubble>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
