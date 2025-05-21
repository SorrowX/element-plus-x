import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import VideoViewer from '../src/video-viewer.vue'

const AXIOM = 'Rem is the best girl'

describe('VideoViewer.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <VideoViewer>{AXIOM}</VideoViewer>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
