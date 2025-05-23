import {
  buildProps,
  definePropType,
  isNumber,
  mutable,
} from '@element-plus/utils'

import type { Component, ExtractPropTypes } from 'vue'
import type { VideoProps } from '@element-plus/components/video'

export type VideoViewerAction =
  | 'zoomIn'
  | 'zoomOut'
  | 'clockwise'
  | 'anticlockwise'

export const videoViewerProps = buildProps({
  /**
   * @description preview link list.
   */
  urlList: {
    type: definePropType<string[] | VideoProps[]>(Array),
    default: () => mutable([] as const),
  },
  /**
   * @description preview backdrop z-index.
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description the initial preview image index, less than or equal to the length of `url-list`.
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description whether preview is infinite.
   */
  infinite: {
    type: Boolean,
    default: true,
  },
  /**
   * @description whether user can emit close event when clicking backdrop.
   */
  hideOnClickModal: Boolean,
  /**
   * @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  teleported: Boolean,
  /**
   * @description whether the image-viewer can be closed by pressing ESC.
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /**
   * @description the zoom rate of the image viewer zoom event.
   */
  zoomRate: {
    type: Number,
    default: 1.2,
  },
  /**
   * @description the min scale of the image viewer zoom event.
   */
  minScale: {
    type: Number,
    default: 0.2,
  },
  /**
   * @description the max scale of the image viewer zoom event.
   */
  maxScale: {
    type: Number,
    default: 7,
  },
} as const)
export type VideoViewerProps = ExtractPropTypes<typeof videoViewerProps>

export const videoViewerEmits = {
  close: () => true,
  switch: (index: number) => isNumber(index),
  rotate: (deg: number) => isNumber(deg),
}
export type VideoViewerEmits = typeof videoViewerEmits

export interface VideoViewerMode {
  name: string
  icon: Component
}
