import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DialogV2 from '../src/dialog-v2.vue'

const AXIOM = 'Rem is the best girl'

describe('DialogV2.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DialogV2>{AXIOM}</DialogV2>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
