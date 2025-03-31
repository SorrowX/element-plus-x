import { h, nextTick, ref, watch, withDirectives } from 'vue'
import {
  ElIcon,
  useNamespace,
  ClickOutside as vClickoutside,
} from 'element-plus'
import { CHANGE_EVENT, DIV_TAG, SPAN_TAG } from '@element-plus/constants'
import { editableEmits, editableProps } from './editable'
import type { ValueType } from './editable'

const ElEditable = {
  name: 'ElEditable',
  inheritAttrs: false,
  props: editableProps,
  emits: editableEmits,
  setup(props: any, { slots, attrs, emit, expose }: any) {
    const ns = useNamespace('editable')

    const isEditable = ref(props.defaultEditState)
    const wrapper = ref()

    let oldValue: ValueType = null
    let currentValue: ValueType = null
    let preCurrentValue: ValueType = null
    let isModify: boolean = false

    const setEditable = (editable: boolean) => {
      isEditable.value = editable

      // 计算 isModify 及更新 preCurrentValue
      isModify = editable
        ? false // 从阅读态切换到编辑态，不存在修改了值
        : preCurrentValue === props.modelValue
        ? false // 上一次的值和本次的值一致，也不存在修改了值
        : true
      nextTick(() => {
        preCurrentValue = currentValue
      })

      emit(CHANGE_EVENT, editable, {
        currentValue,
        oldValue,
        isModify,
        preCurrentValue,
      })
    }

    const handleFocus = () => {
      setTimeout(() => {
        wrapper.value.querySelector('input')?.focus()
        wrapper.value.querySelector('textarea')?.focus()
      })
    }

    const setEditableTure = () => {
      setEditable(true)
      if (props.focus) {
        handleFocus()
      }
    }
    const setEditableFalse = () => setEditable(false)

    watch(
      () => props.modelValue,
      (cur, old) => {
        oldValue = old
        currentValue = cur
      },
      {
        immediate: true,
      }
    )

    expose({
      setEditable,
    })

    return () => {
      const { trigger, icon } = props
      const pure = { ...attrs }
      delete pure.style
      delete pure.class

      const component = h(
        DIV_TAG,
        {
          class: ns.b('component'),
          key: isEditable.value,
        },
        slots?.default?.()
      )

      const editVNode = withDirectives(component, [
        [vClickoutside, setEditableFalse],
      ])

      const textData: Record<string, any> = { class: ns.b('text') }
      if (trigger === 'dblclick') {
        textData.ondblclick = setEditableTure
      }
      if (trigger === 'click') {
        textData.onClick = setEditableTure
      }
      const iconVNode = h(
        ElIcon,
        {
          class: ns.b('icon'),
          ...pure,
          onClick: setEditableTure,
        },
        {
          default: () => slots?.icon?.() ?? (icon ? h(icon) : ''),
        }
      )
      const textVNode = h(DIV_TAG, textData, [
        slots?.text?.() ?? h(SPAN_TAG, props.modelValue),
        trigger === 'icon' ? iconVNode : '',
      ])

      return h(
        DIV_TAG,
        {
          class: [ns.b(), attrs.class],
          style: attrs.style,
          ref: wrapper,
        },
        [isEditable.value ? editVNode : textVNode]
      )
    }
  },
}

export default ElEditable
