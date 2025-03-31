import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Submit from '../src/submit.vue'

const AXIOM = 'Rem is the best girl'

describe('Submit.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Submit>{AXIOM}</Submit>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
