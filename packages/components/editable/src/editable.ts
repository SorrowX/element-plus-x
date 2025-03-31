import { CHANGE_EVENT } from '@element-plus/constants'
import { buildProps, isBoolean, isObject } from '@element-plus/utils'
import { Edit } from '@element-plus/icons-vue'

import type { ExtractPropTypes } from 'vue'

export type ValueType = any

export const editableProps = buildProps({
  modelValue: {
    type: null,
  },
  trigger: {
    type: String,
    values: ['dblclick', 'click', 'icon'],
    default: 'dblclick',
  },
  icon: {
    type: null,
    default: Edit,
  },
  defaultEditState: {
    type: Boolean,
    default: false,
  },
  focus: {
    type: Boolean,
    default: true,
  },
} as const)
export type EditableProps = ExtractPropTypes<typeof editableProps>

export const editableEmits = {
  [CHANGE_EVENT]: (editable: boolean, options: any) =>
    isBoolean(editable && isObject(options)),
}
export type EditableEmits = typeof editableEmits
