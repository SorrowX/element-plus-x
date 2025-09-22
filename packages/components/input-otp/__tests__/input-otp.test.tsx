import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import InputOtp from '../src/input-otp.vue'

const AXIOM = 'Rem is the best girl'

describe('InputOtp.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <InputOtp>{AXIOM}</InputOtp>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
