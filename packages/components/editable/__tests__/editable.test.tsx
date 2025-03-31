import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Editable from '../src/editable.vue'

const AXIOM = 'Rem is the best girl'

describe('Editable.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Editable>{AXIOM}</Editable>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
