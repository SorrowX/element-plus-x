import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LoadMore from '../src/load-more.vue'

const AXIOM = 'Rem is the best girl'

describe('LoadMore.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <LoadMore>{AXIOM}</LoadMore>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
