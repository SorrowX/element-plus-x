import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Case from '../src/case.vue'

const AXIOM = 'Rem is the best girl'

describe('Case.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Case>{AXIOM}</Case>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
