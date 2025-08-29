import {
  buildProps,
  definePropType,
  isArray,
  isNumber,
  isObject,
  isString,
} from '@element-plus/utils'

import type { CSSProperties } from 'vue'

export interface ITreeOption {
  label: string
  value: string
  disabled?: boolean
  children?: ITreeOption[]
  [key: string]: any
}

export interface ITabItem {
  type: 'group' | 'option'
  title: string
  id: string
  options: ITreeOption[]
}
export type IPanelModelValue =
  | string
  | number
  | string[]
  | number[]
  | Record<string, any>
  | Record<string, any>[]

export const panelProps = buildProps({
  modelValue: {
    type: definePropType<Array<IPanelModelValue>>([
      Array,
      Number,
      String,
      Object,
    ]),
  },
  tabs: {
    type: definePropType<Array<ITabItem>>(Array),
    default: () => [],
  },
  tab: {
    type: definePropType<string | number>([String, Number]),
  },
  prefixLabel: {
    type: definePropType<string>(String),
    default: '{x}',
  },
  multiple: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  tabsProps: {
    type: definePropType<Record<string, any>>(Object),
  },
  treeProps: {
    type: definePropType<Record<string, any>>(Object),
  },
  border: {
    type: definePropType<boolean>(Boolean),
    default: true,
  },
  height: {
    type: definePropType<string>(String),
    default: '260px',
  },
  panelStyle: {
    type: definePropType<CSSProperties>(Object),
  },
  showSearch: {
    type: definePropType<boolean>(Boolean),
    default: true,
  },
  valueKey: {
    type: definePropType<string>(String),
  },
  loading: {
    type: definePropType<boolean>(Boolean),
    default: false,
  },
  remoteMethod: {
    type: definePropType<
      (query: string, currentTabId: string | number) => void
    >(Function),
  },
} as const)

export const panelEmits = {
  'update:tab': (val: string | number) => isString(val) || isNumber(val),
  'update:modelValue': (val: IPanelModelValue) =>
    isString(val) || isNumber(val) || isArray(val) || isObject(val),
  change: (val: IPanelModelValue) =>
    isString(val) || isNumber(val) || isArray(val) || isObject(val),
  'selected-options-change': (val: ITreeOption[]) => isArray(val),
}
