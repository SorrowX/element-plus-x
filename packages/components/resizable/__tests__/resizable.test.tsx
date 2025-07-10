import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Resizable from '../src/resizable.vue'

const AXIOM = 'Rem is the best girl'

describe('Resizable.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Resizable>{AXIOM}</Resizable>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
