import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import AffixBottom from '../src/affix-bottom.vue'

const AXIOM = 'Rem is the best girl'

describe('AffixBottom.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <AffixBottom>{AXIOM}</AffixBottom>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
