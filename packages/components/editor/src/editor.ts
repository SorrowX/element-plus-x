import {
  buildProps,
  definePropType,
  isObject,
  isString,
} from '@element-plus/utils'
import { UPDATE_MODEL_EVENT } from '@element-plus/constants'
import type { EnterValues, MentionOption } from './types'
import type { EditorOptions } from '@tiptap/core'
import type { ExtractPropTypes } from 'vue'

export const editorProps = buildProps({
  modelValue: {
    type: String,
    default: '',
  },
  maxlength: {
    type: [String, Number],
    default: '',
  },
  options: {
    type: definePropType<
      | MentionOption[]
      | ((options: { query: string }) => Promise<MentionOption[]>)
    >([Array, Function]),
    default: () => [],
  },
  prefix: {
    type: definePropType<string>(String),
    default: '@',
  },
  extensions: {
    type: definePropType<any[]>(Array),
    default: () => [],
  },
  placeholder: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disableEnterEmit: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  editorOptions: {
    type: definePropType<Partial<EditorOptions>>(Object),
    default: () => ({}),
  },
  resize: {
    type: Boolean,
    default: false,
  },
} as const)
export type EditorProps = ExtractPropTypes<typeof editorProps>

export const editorEmits = {
  enter: (values: EnterValues) => isObject(values),
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
}
export type EditorEmits = typeof editorEmits
