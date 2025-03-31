import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DropdownV2 from '../src/dropdown-v2.vue'

const AXIOM = 'Rem is the best girl'

describe('DropdownV2.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DropdownV2>{AXIOM}</DropdownV2>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
