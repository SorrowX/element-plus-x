import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DrawerV2 from '../src/drawer-v2.vue'

const AXIOM = 'Rem is the best girl'

describe('DrawerV2.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DrawerV2>{AXIOM}</DrawerV2>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
