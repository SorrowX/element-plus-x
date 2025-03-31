import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Flex from '../src/flex.vue'

const AXIOM = 'Rem is the best girl'

describe('Flex.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Flex>{AXIOM}</Flex>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
