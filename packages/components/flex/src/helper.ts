import { isArray, isObject, isString } from '@element-plus/utils'
import type { ComponentSize } from 'element-plus'
import type { FlexProps } from './flex'

const classNames = (...args: any[]): string => {
  const classes = []
  for (const value of args) {
    if (!value) continue
    if (isString(value)) {
      classes.push(value)
    } else if (isArray(value)) {
      for (const element of value) {
        const inner = classNames(element)
        if (inner) {
          classes.push(inner)
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name]) {
          classes.push(name)
        }
      }
    }
  }
  return classes.join(' ')
}

export const flexWrapValues = ['wrap', 'nowrap', 'wrap-reverse'] as const

export const justifyContentValues = [
  'flex-start',
  'flex-end',
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
  'stretch',
  'normal',
  'left',
  'right',
] as const

export const alignItemsValues = [
  'center',
  'start',
  'end',
  'flex-start',
  'flex-end',
  'self-start',
  'self-end',
  'baseline',
  'normal',
  'stretch',
] as const

const genClsWrap = (prefixCls: string, props: FlexProps) => {
  const wrapCls: Record<PropertyKey, boolean> = {}
  flexWrapValues.forEach((cssKey) => {
    wrapCls[`${prefixCls}-wrap-${cssKey}`] = props.wrap === cssKey
  })
  return wrapCls
}

const genClsAlign = (prefixCls: string, props: FlexProps) => {
  const alignCls: Record<PropertyKey, boolean> = {}
  alignItemsValues.forEach((cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = props.align === cssKey
  })
  alignCls[`${prefixCls}-align-stretch`] = !props.align && !!props.vertical
  return alignCls
}

const genClsJustify = (prefixCls: string, props: FlexProps) => {
  const justifyCls: Record<PropertyKey, boolean> = {}
  justifyContentValues.forEach((cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = props.justify === cssKey
  })
  return justifyCls
}

export function createFlexClassNames(prefixCls: string, props: FlexProps) {
  return classNames({
    ...genClsWrap(prefixCls, props),
    ...genClsAlign(prefixCls, props),
    ...genClsJustify(prefixCls, props),
  })
}

export function isPresetSize(
  size?: ComponentSize | string | number
): size is ComponentSize {
  return ['small', 'default', 'large'].includes(size as string)
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  fields: K[]
): Omit<T, K> {
  const shallowCopy = Object.assign({}, obj)
  for (const key of fields) {
    delete shallowCopy[key]
  }
  return shallowCopy
}
