import {
  camelize,
  capitalize,
  defineComponent,
  getCurrentInstance,
  h,
  resolveComponent,
} from 'vue'
import { compile } from '@vue/compiler-dom'
import * as runtimeDom from '@vue/runtime-dom'
import { NodeViewWrapper, nodeViewProps } from '@tiptap/vue-3'

const compileToFunction = (template: string) => {
  const { code } = compile(template)
  return new Function('Vue', code)(runtimeDom)
}

const resolve = (registry: Record<string, any>, name: string) => {
  return (
    registry &&
    (registry[name] ||
      registry[camelize(name)] ||
      registry[capitalize(camelize(name))])
  )
}

const isVueComponent = (registry: Record<string, any>, name: string) =>
  !!resolve(registry, name)

export const Component = defineComponent({
  name: 'Component',
  inheritAttrs: false,
  props: {
    ...nodeViewProps,
  },
  setup(props) {
    const instance = getCurrentInstance()

    return () => {
      const { node } = props

      const attrs: Record<string, any> = { ...node.attrs.props }
      const template = attrs.template
      delete attrs.template

      const isCustomTag = isVueComponent(
        instance?.appContext?.components ?? {},
        attrs.is
      )
      const parent = isCustomTag ? resolveComponent(attrs.is) : attrs.is
      const child = {
        render: compileToFunction(template),
      }

      const renderChild = () => {
        return h(
          parent,
          { ...attrs },
          isCustomTag
            ? {
                default: () => h(child),
              }
            : [h(child)]
        )
      }

      return h(
        NodeViewWrapper,
        {
          class: ['tiptap-extension-component', attrs['wrap-class']],
        },
        {
          default: () => renderChild(),
        }
      )
    }
  },
})
