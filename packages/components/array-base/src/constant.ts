import type { InjectionKey } from 'vue'
import type { IArrayBaseContext } from './array-base'
import type { IArrayBaseItemProps } from './array-base-item'

export const ArrayBaseSymbol: InjectionKey<IArrayBaseContext> =
  Symbol('ArrayBaseContext')

export const ItemSymbol: InjectionKey<IArrayBaseItemProps> =
  Symbol('ItemContext')

export const sortHandleKls = '.array-base-sort-handle'
