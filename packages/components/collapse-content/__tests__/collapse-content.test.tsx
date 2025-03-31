import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CollapseContent from '../src/collapse-content.vue'

const AXIOM = 'Rem is the best girl'

describe('CollapseContent.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <CollapseContent>{AXIOM}</CollapseContent>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
