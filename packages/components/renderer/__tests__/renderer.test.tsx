import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Renderer from '../src/renderer.vue'

const AXIOM = 'Rem is the best girl'

describe('Renderer.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Renderer>{AXIOM}</Renderer>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
