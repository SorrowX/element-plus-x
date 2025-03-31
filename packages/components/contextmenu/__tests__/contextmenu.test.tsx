import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Contextmenu from '../src/contextmenu.vue'

const AXIOM = 'Rem is the best girl'

describe('Contextmenu.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Contextmenu>{AXIOM}</Contextmenu>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
