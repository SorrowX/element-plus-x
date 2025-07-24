import { buildProps } from '@element-plus/utils'
import { panelEmits, panelProps } from './panel'
import type { ExtractPropTypes } from 'vue'

export const tabsSelectProps = buildProps({
  ...panelProps,
} as const)
export type TabsSelectProps = ExtractPropTypes<typeof tabsSelectProps>

export const tabsSelectEmits = {
  ...panelEmits,
}
export type TabsSelectEmits = typeof tabsSelectEmits
