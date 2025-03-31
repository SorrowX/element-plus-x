import { inject, onBeforeUnmount, ref, toRefs } from 'vue'
import { formContextKey, formItemContextKey } from 'element-plus'
import { uid } from '@element-plus/utils/uid'
import { isUndefined } from '@element-plus/utils'
import { ArrayBaseSymbol, ItemSymbol } from './constant'
import type { IFieldContext, IFormContext } from './array-base'

export const useArray = () => {
  return inject(ArrayBaseSymbol, {} as any)
}

export const useIndex = (idx?: number) => {
  return isUndefined(idx) ? toRefs(inject(ItemSymbol) as any).index : ref(idx)
}

export const useRecord = (item?: any) => {
  return isUndefined(item)
    ? toRefs(inject(ItemSymbol) as any).record
    : ref(item)
}

export const useField = (): IFieldContext =>
  inject(formItemContextKey, undefined)

export const useForm = (): IFormContext => inject(formContextKey, undefined)

export type keyMapType = string[]

export const useKey = () => {
  let keyMap: keyMapType = []

  onBeforeUnmount(() => {
    keyMap = []
  })

  return {
    keyMap,
    getKey: (index: number) => {
      if (!keyMap[index]) {
        keyMap[index] = uid()
      }
      return `${keyMap[index]}-${index}`
    },
  }
}
