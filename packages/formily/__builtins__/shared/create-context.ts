import {
  InjectionKey,
  Ref,
  defineComponent,
  inject,
  provide,
  readonly,
  ref,
  toRef,
} from 'vue'
import type { DefineComponent } from 'vue'

export type CreateContext<T> = {
  Provider?: DefineComponent
  Consumer?: DefineComponent
  injectKey: InjectionKey<Ref<T>>
}

export const createContext = <T>(defaultValue?: T): CreateContext<T> => {
  const injectKey: InjectionKey<Ref<T>> = Symbol()

  return {
    // eslint-disable-next-line vue/one-component-per-file
    Provider: defineComponent({
      name: 'ContextProvider',
      props: {
        value: {
          type: null,
          default() {
            return defaultValue ?? null
          },
        },
      },
      setup(props: any, { slots }: any) {
        const value = toRef(props, 'value')
        provide(injectKey, readonly(value))

        return () => slots?.default?.()
      },
    }),

    // eslint-disable-next-line vue/one-component-per-file
    Consumer: defineComponent({
      name: 'ContextConsumer',
      setup(_props, { slots }) {
        const value = inject(injectKey)
        return () => slots?.default?.(value)
      },
    }),
    injectKey,
  }
}

export const useContext = <T>(context: CreateContext<T>) => {
  const key = context.injectKey
  return inject(key, ref(null) as any)
}
