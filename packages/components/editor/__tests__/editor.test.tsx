import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Editor from '../src/editor.vue'

const AXIOM = 'Rem is the best girl'

describe('Editor.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Editor>{AXIOM}</Editor>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
