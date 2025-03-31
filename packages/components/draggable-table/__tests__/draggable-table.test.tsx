import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import DraggableTable from '../src/draggable-table.vue'

const AXIOM = 'Rem is the best girl'

describe('DraggableTable.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <DraggableTable>{AXIOM}</DraggableTable>)

    expect(wrapper.text()).toEqual(AXIOM)
  })
})
