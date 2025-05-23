import { buildProps, isBoolean } from '@element-plus/utils'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@element-plus/constants'
import type { ExtractPropTypes } from 'vue'

export const readMoreProps = buildProps({
  height: {
    type: String,
    default: '200px',
  },
  modelValue: {
    type: Boolean,
    default: true,
  },
  transition: {
    type: Boolean,
    default: true,
  },
  openText: {
    type: String,
  },
  closeText: {
    type: String,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
} as const)
export type ReadMoreProps = ExtractPropTypes<typeof readMoreProps>

export const readMoreEmits = {
  [CHANGE_EVENT]: (value: boolean) => isBoolean(value),
  [UPDATE_MODEL_EVENT]: (value: boolean) => isBoolean(value),
}
export type ReadMoreEmits = typeof readMoreEmits
