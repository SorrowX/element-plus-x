import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import PreviewFile from '../src/preview-file.vue'

const AXIOM = 'Rem is the best girl'

describe('PreviewFile.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <PreviewFile>{AXIOM}</PreviewFile>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
