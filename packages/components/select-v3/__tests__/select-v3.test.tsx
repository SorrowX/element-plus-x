import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import SelectV3 from '../src/select-v3.vue'

const AXIOM = 'Rem is the best girl'

describe('SelectV3.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <SelectV3>{AXIOM}</SelectV3>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
