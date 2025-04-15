import {
  defineComponent,
  getCurrentInstance,
  h,
  provide,
  reactive,
  ref,
} from 'vue'
import { useNamespace } from 'element-plus'
import { buildProps, definePropType } from '@element-plus/utils'
import { DIV_TAG, UL_TAG } from '@element-plus/constants'
import SubItem from './sub-item'
import Item from './item'
import type { ElTooltipProps } from 'element-plus'
import type { ExtractPropTypes } from 'vue'
import type {
  DropdownOption,
  DropdownValue,
  ItemClicked,
  PanelProvider,
  SubItemProvider,
  SubItemReturn,
} from './types'

export const panelProps = buildProps({
  options: {
    type: definePropType<DropdownOption[]>(Array),
    default: () => [] as DropdownOption[],
  },
  showTimeout: {
    type: definePropType<number>(Number),
    default: 200,
  },
  hideTimeout: {
    type: definePropType<number>(Number),
    default: 200,
  },
  pure: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  tooltipOptions: {
    type: definePropType<Partial<ElTooltipProps>>(Object),
  },
  width: {
    type: definePropType<string | number>([String, Number]),
    default: '140px',
  },
  trigger: {
    type: definePropType<string>(String),
    default: 'hover',
    values: ['hover', 'click'],
  },
} as const)
export type PanelProps = ExtractPropTypes<typeof panelProps>

export default defineComponent({
  name: 'ElDropdownV2Panel',
  inheritAttrs: false,
  props: panelProps,
  emits: ['open', 'close', 'select'],
  setup(props, { emit, attrs, expose }) {
    const ns = useNamespace('dropdown-v2')
    const instance = getCurrentInstance()!

    const mouseInChild = ref(false)
    const openedItems = ref<PanelProvider['openedItems']>([])
    const activeIndex = ref<PanelProvider['activeIndex']>()
    const subItemRefs = ref<Record<string, SubItemReturn>>({})

    const openItem: PanelProvider['openItem'] = (value, valuePath) => {
      if (openedItems.value.includes(value)) return
      openedItems.value.push(value)
      emit('open', value, valuePath)
    }

    const close = (value: DropdownValue) => {
      const i = openedItems.value.indexOf(value)
      if (i !== -1) {
        openedItems.value.splice(i, 1)
      }
    }

    const closeItem: PanelProvider['closeItem'] = (value, valuePath) => {
      close(value)
      emit('close', value, valuePath)
    }

    const closeSubItem = (value: DropdownValue, valuePath: DropdownValue[]) => {
      const items = Object.values(subItemRefs.value).filter(
        (_: SubItemReturn) => valuePath.includes(_.value)
      )
      items.forEach((_: SubItemReturn) => _.hide())
    }

    const handleItemClick = (item: ItemClicked) => {
      openedItems.value = []
      activeIndex.value = item.value
      emitSelect(item)
    }

    const emitSelect = (item: ItemClicked) => {
      const { value, valuePath } = item
      emit('select', value, valuePath, { value, valuePath })
    }

    // TODO: TYPE PanelProvider
    provide<any>(
      'rootPanel',
      reactive({
        props,
        openedItems,
        activeIndex,
        openItem,
        closeItem,
        handleItemClick,
        closeSubItem,
        emitSelect,
      })
    )

    provide<SubItemProvider>(`subItem:${instance.uid}`, {
      mouseInChild,
      level: 0,
    })

    expose({
      close,
      openItem,
      closeItem,
    })

    return () => {
      const renderChilds = (options: DropdownOption[] = [], level: number) => {
        return options.map((option: DropdownOption) => {
          if (Array.isArray(option.children) && option.children.length) {
            return h(
              SubItem,
              {
                level,
                option,
                ref: (expose: any) => {
                  subItemRefs['value'][option.value] = expose
                },
              },
              {
                default: () => renderChilds(option.children, level + 1),
              }
            )
          } else {
            return h(Item, { option, level })
          }
        })
      }

      return props.pure
        ? h(
            DIV_TAG,
            { class: [ns.b('panel'), attrs.class] },
            renderChilds(props.options, 0)
          )
        : h(DIV_TAG, { class: [ns.b('panel'), attrs.class] }, [
            h(
              UL_TAG,
              { class: [ns.b('list'), ns.b('panel-content')] },
              renderChilds(props.options, 0)
            ),
          ])
    }
  },
})
