import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import Video from '../src/video.vue'

const AXIOM = 'Rem is the best girl'

describe('Video.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Video>{AXIOM}</Video>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
