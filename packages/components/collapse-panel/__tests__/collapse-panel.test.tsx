import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import CollapsePanel from '../src/collapse-panel.vue'

const AXIOM = 'Rem is the best girl'

describe('CollapsePanel.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <CollapsePanel>{AXIOM}</CollapsePanel>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
