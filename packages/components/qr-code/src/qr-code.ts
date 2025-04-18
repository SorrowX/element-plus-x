import QRCode from 'qrcode'
import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes, MaybeRefOrGetter } from 'vue'

export interface ColorType {
  light: string
  dark: string
}

export interface IconConfig {
  radius: number
  size: number
  backgroundColor: string
  padding: number
}

export const getDefaultIconConfig = () => {
  return {
    radius: 4,
    size: 40,
    backgroundColor: '#fff',
    padding: 4,
  }
}

export const qrCodeProps = buildProps({
  text: {
    type: definePropType<string>(String),
    default: '',
  },
  options: {
    type: definePropType<QRCode.QRCodeToDataURLOptions>(Object),
    default: () => ({}),
  },
  size: {
    type: definePropType<number | string>([Number, String]),
    default: 120,
  },
  margin: {
    type: definePropType<number | string>([Number, String]),
    default: 2,
  },
  color: {
    type: definePropType<MaybeRefOrGetter<string>>(String),
  },
  backgroundColor: {
    type: definePropType<MaybeRefOrGetter<string>>(String),
  },
  iconSrc: {
    type: definePropType<string>(String),
  },
  iconConfig: {
    type: definePropType<IconConfig>(Object),
    default: () => getDefaultIconConfig(),
  },
} as const)
export type QrCodeProps = ExtractPropTypes<typeof qrCodeProps>

export const qrCodeEmits = {}
export type QrCodeEmits = typeof qrCodeEmits
