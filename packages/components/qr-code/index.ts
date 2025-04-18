import { withInstall } from '@element-plus/utils'
import QrCode from './src/index'
import type { SFCWithInstall } from '@element-plus/utils'

export const ElQrCode: SFCWithInstall<typeof QrCode> = withInstall(QrCode)
export default ElQrCode

export * from './src/qr-code'
export type { QrCodeInstance } from './src/instance'
