import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TextEllipsis from '../src/text-ellipsis.vue'

const AXIOM = 'Rem is the best girl'

describe('TextEllipsis.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TextEllipsis>{AXIOM}</TextEllipsis>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
