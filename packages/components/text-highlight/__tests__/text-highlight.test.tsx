import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import TextHighlight from '../src/text-highlight.vue'

const AXIOM = 'Rem is the best girl'

describe('TextHighlight.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <TextHighlight>{AXIOM}</TextHighlight>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
