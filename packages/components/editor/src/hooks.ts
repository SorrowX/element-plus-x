import { inject, provide } from 'vue'
import type { ComputedRef } from 'vue'
import type { IToolBarContext } from './types'

export const editorToolBarContextKey = Symbol('editorToolBarContextKey')

export const provideToolBarContext = (
  context: ComputedRef<IToolBarContext>
) => {
  return provide(editorToolBarContextKey, context)
}

export const useToolBarContext = () => {
  return inject(editorToolBarContextKey) as ComputedRef<IToolBarContext>
}
