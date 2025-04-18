import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import QrCode from '../src/qr-code.vue'

const AXIOM = 'Rem is the best girl'

describe('QrCode.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <QrCode>{AXIOM}</QrCode>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
