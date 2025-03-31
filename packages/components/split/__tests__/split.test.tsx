import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Split from '../src/split.vue'

const AXIOM = 'Rem is the best girl'

describe('Split.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Split>{AXIOM}</Split>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
