import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import FullScreen from '../src/full-screen.vue'

const AXIOM = 'Rem is the best girl'

describe('FullScreen.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <FullScreen>{AXIOM}</FullScreen>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
