import { h, isVNode, toRaw } from 'vue'
// import { isVnode } from './utils'
import { SlotTypes } from '.'
import type { Component } from 'vue'

export const resolveComponent = (
  child?: SlotTypes,
  props?: Record<string, any>
) => {
  if (child) {
    if (typeof child === 'string' || typeof child === 'number') {
      return child
    } else if (typeof child === 'function') {
      return (child as any)(props)
    } else if (isVNode(child)) {
      return child
    } else {
      return h(toRaw(child as Component), props)
    }
  }

  return null
}
