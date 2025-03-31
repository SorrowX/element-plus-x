import { buildProps, definePropType } from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import type { ExtractPropTypes } from 'vue'
// import type { Options } from 'sortablejs'

type SortableOptions = any // Options

export const sortableListProps = buildProps({
  modelValue: {
    type: definePropType<any[]>(Array),
    required: true,
  },
  tag: {
    type: definePropType<string>(String),
    default: 'div',
  },
  options: {
    type: definePropType<SortableOptions>(Object),
    default: () => ({
      animation: 300,
    }),
  },
} as const)
export type SortableListProps = ExtractPropTypes<typeof sortableListProps>

export const sortableListEmits = {
  [UPDATE_MODEL_EVENT]: (value: any) => !!value,
  [CHANGE_EVENT]: (value: any) => !!value,
}
export type SortableListEmits = typeof sortableListEmits
