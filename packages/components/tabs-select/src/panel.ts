import {
  buildProps,
  definePropType,
  isArray,
  isNumber,
  isObject,
  isString,
} from '@element-plus/utils'

export interface ITreeOption {
  label: string
  value: string
  disabled?: boolean
  children?: ITreeOption[]
}

export interface ITabItem {
  type: 'group' | 'option'
  title: string
  id: string
  options: ITreeOption[]
}

export const panelProps = buildProps({
  modelValue: {
    type: definePropType<string | number | string[] | number[]>([
      String,
      Number,
      Array,
    ]),
    default: () => '',
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
} as const)

export const panelEmits = {
  'update:tab': (val: string | number) => isString(val) || isNumber(val),
  'update:modelValue': (val: string | number | string[] | number[]) =>
    isString(val) || isNumber(val) || isArray(val),
  change: (val: string | number | string[] | number[], data: ITreeOption) =>
    isString(val) || isNumber(val) || isArray(val) || isObject(data),
  'selected-options-change': (val: ITreeOption[]) => isArray(val),
}
