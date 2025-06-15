import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LineTree from '../src/line-tree.vue'

const AXIOM = 'Rem is the best girl'

describe('LineTree.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <LineTree>{AXIOM}</LineTree>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
