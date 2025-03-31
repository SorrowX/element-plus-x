import type { InjectionKey, Ref } from 'vue'

export const StartIndexSymbol: InjectionKey<Ref<number>> = Symbol('startIndex')

export const GetKeySymbol: InjectionKey<(index: number) => string> =
  Symbol('getKey')
