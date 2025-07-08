export const styleMapping = {
  x: {
    l: 'left',
    m: 'marginLeft',
    r: 'right',
  },
  y: {
    t: 'top',
    m: 'marginTop',
    b: 'bottom',
  },
} as const

export type IStyleMapping = typeof styleMapping
export type IAxis = keyof IStyleMapping // 'x' | 'y'
export type IXKey = keyof IStyleMapping['x'] // 'l' | 'm' | 'r'
export type IYKey = keyof IStyleMapping['y'] // 't' | 'm' | 'b'
export type IXValue = IStyleMapping['x'][IXKey] // 'left' | 'marginLeft' | 'right'
export type IYValue = IStyleMapping['y'][IYKey] // 'top' | 'marginTop' | 'bottom'

export interface IState {
  zIndex: number
  parentWidth: number
  parentHeight: number
  left: number
  top: number
  right: number
  bottom: number
  aspectFactor: number
}

export interface IBeforeMoveState {
  pointerX: number
  pointerY: number
  left: number
  right: number
  top: number
  bottom: number
  width: number
  height: number
}

type ILimitValue = number | null
export interface ILimits {
  left: { min: ILimitValue; max: ILimitValue }
  right: { min: ILimitValue; max: ILimitValue }
  top: { min: ILimitValue; max: ILimitValue }
  bottom: { min: ILimitValue; max: ILimitValue }
}

export interface IDelta {
  x: number
  y: number
}

export const sticks = ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'] as const
export type IStick = (typeof sticks)[number]

export type IMoveType = 'stickMove' | 'targetMove'
