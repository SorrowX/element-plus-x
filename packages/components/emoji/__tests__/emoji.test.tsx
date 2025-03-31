import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Emoji from '../src/emoji.vue'

const AXIOM = 'Rem is the best girl'

describe('Emoji.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Emoji>{AXIOM}</Emoji>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
