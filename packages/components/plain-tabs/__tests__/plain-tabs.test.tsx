import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PlainTabs from '../src/plain-tabs.vue'

const AXIOM = 'Rem is the best girl'

describe('PlainTabs.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PlainTabs>{AXIOM}</PlainTabs>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
