import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ReadMore from '../src/read-more.vue'

const AXIOM = 'Rem is the best girl'

describe('ReadMore.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <ReadMore>{AXIOM}</ReadMore>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
