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

export type ILimitValue = number | null
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

export interface IStickStyle {
  width: string
  height: string
  left?: string
  marginLeft?: string
  right?: string
  top?: string
  marginTop?: string
  bottom?: string
}

export interface IRect {
  left: number
  top: number
  width: number
  height: number
}
