import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ArrayBase from '../src/array-base.vue'

const AXIOM = 'Rem is the best girl'

describe('ArrayBase.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ArrayBase>{AXIOM}</ArrayBase>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
