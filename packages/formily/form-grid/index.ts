import {
  computed,
  defineComponent,
  h,
  inject,
  onMounted,
  provide,
  ref,
  watchEffect,
} from 'vue'
import { observer } from '@formily/reactive-vue'
import { markRaw } from '@formily/reactive'
import { Grid, IGridOptions } from '@formily/grid'
import { composeExport, stylePrefix } from '../__builtins__'
import { useFormLayout } from '../form-layout'
import type {
  CSSProperties,
  InjectionKey,
  PropType,
  Ref,
  SetupContext,
} from 'vue'

export interface IFormGridProps extends IGridOptions {
  grid?: Grid<HTMLElement>
  prefixCls?: string
  className?: string
  style?: CSSProperties
  [prop: string]: any
}

const FormGridSymbol: InjectionKey<Ref<Grid<HTMLElement>>> =
  Symbol('FormGridContext')

interface GridColumnProps {
  gridSpan: number
}

export const createFormGrid = (props: IFormGridProps): Grid<HTMLElement> => {
  return markRaw(new Grid(props))
}

export const useFormGrid = (): Ref<Grid<HTMLElement>> =>
  inject(FormGridSymbol) as Ref<Grid<HTMLElement>>

/**
 * @deprecated
 */
const useGridSpan = (gridSpan: number) => {
  return gridSpan
}

/**
 * @deprecated
 */
export const useGridColumn = (gridSpan = 1) => {
  return gridSpan
}

const FormGridInner = observer(
  defineComponent({
    name: 'FFormGrid',
    props: {
      columnGap: {
        type: Number,
      },
      rowGap: {
        type: Number,
      },
      minColumns: {
        type: [Number, Array],
      },
      minWidth: {
        type: [Number, Array],
      },
      maxColumns: {
        type: [Number, Array],
      },
      maxWidth: {
        type: [Number, Array],
      },
      breakpoints: {
        type: Array,
      },
      colWrap: {
        type: Boolean,
        default: true,
      },
      strictAutoFit: {
        type: Boolean,
        default: false,
      },
      shouldVisible: {
        type: Function as PropType<IGridOptions['shouldVisible']>,
        default() {
          return () => true
        },
      },
      grid: {
        type: Object as PropType<Grid<HTMLElement>>,
      },
    },
    setup(props: IFormGridProps, { slots }) {
      const layout = useFormLayout()

      const gridInstance = computed(() => {
        const newProps: IFormGridProps = {}
        Object.keys(props).forEach((key) => {
          if (typeof props[key] !== 'undefined') {
            newProps[key as keyof IFormGridProps] = props[key]
          }
        })
        const options = {
          columnGap: layout.value?.gridColumnGap ?? 8,
          rowGap: layout.value?.gridRowGap ?? 4,
          ...newProps,
        }
        return markRaw(options?.grid ? options.grid : new Grid(options))
      })
      const prefixCls = `${stylePrefix}-form-grid`
      const root = ref<HTMLElement>()

      provide(FormGridSymbol, gridInstance)

      onMounted(() => {
        watchEffect((onInvalidate) => {
          const dispose = gridInstance.value.connect(root.value as HTMLElement)
          onInvalidate(() => {
            dispose()
          })
        })
      })

      return () => {
        return h(
          'div',
          {
            class: `${prefixCls}`,
            style: {
              gridTemplateColumns: gridInstance.value.templateColumns,
              gap: gridInstance.value.gap,
            },
            ref: root,
          },
          slots
        )
      }
    },
  })
)

const FormGridColumn = observer({
  name: 'FFormGridColumn',
  props: {
    gridSpan: {
      type: Number,
      default: 1,
    },
  },
  setup(props: GridColumnProps, { slots }: SetupContext) {
    return () => {
      return h(
        'div',
        {
          'data-grid-span': props.gridSpan,
        },
        slots
      )
    }
  },
})

export const FormGrid = composeExport(FormGridInner, {
  GridColumn: FormGridColumn,
  useGridSpan,
  useFormGrid,
  createFormGrid,
})

export default FormGrid
