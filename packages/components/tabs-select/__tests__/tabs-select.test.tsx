import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TabsSelect from '../src/tabs-select.vue'

const AXIOM = 'Rem is the best girl'

describe('TabsSelect.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TabsSelect>{AXIOM}</TabsSelect>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
