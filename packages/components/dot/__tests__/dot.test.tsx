import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Dot from '../src/dot.vue'

const AXIOM = 'Rem is the best girl'

describe('Dot.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Dot>{AXIOM}</Dot>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
