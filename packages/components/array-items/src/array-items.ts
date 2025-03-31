import { buildProps } from '@element-plus/utils'

import type { ExtractPropTypes } from 'vue'

export const arrayItemsProps = buildProps({} as const)
export type ArrayItemsProps = ExtractPropTypes<typeof arrayItemsProps>

export const arrayItemsEmits = {}
export type ArrayItemsEmits = typeof arrayItemsEmits
