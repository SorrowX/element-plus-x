import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import List from '../src/list.vue'

const AXIOM = 'Rem is the best girl'

describe('List.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <List>{AXIOM}</List>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
