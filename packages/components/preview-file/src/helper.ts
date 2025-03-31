import * as IconsVue from '@element-plus/components/icons-vue/index'
import type { Component } from 'vue'

const {
  ImageFile,
  MarkdownFile,
  PdfFile,
  PptFile,
  WordFile,
  ZipFile,
  VideoFile,
  AudioFile,
  ExcelFile,
  UnknownFile,
} = IconsVue

const DEFAULT_ICON_COLOR = '#8c8c8c'
const DEFAULT_ICON_SIZE = 32

const IMG_EXTS = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg']

export const EXCEL_TYPE = 'excel'
export const IMAGE_TYPE = 'image'
export const MARKDOWN_TYPE = 'markdown'
export const PDF_TYPE = 'pdf'
export const PPT_TYPE = 'ppt'
export const WORD_TYPE = 'word'
export const ZIP_TYPE = 'zip'
export const VIDEO_TYPE = 'video'
export const AUDIO_TYPE = 'audio'
export const UNKNOWN_TYPE = 'unknown'

export const PRESET_FILE_ICONS: {
  ext: string[]
  iconColor: string
  iconSize: number
  type: string
  icon: Component
}[] = [
  {
    type: EXCEL_TYPE,
    icon: ExcelFile,
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: '#22b35e',
    ext: ['xlsx', 'xls'],
  },
  {
    type: IMAGE_TYPE,
    icon: ImageFile,
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: DEFAULT_ICON_COLOR,
    ext: IMG_EXTS,
  },
  {
    type: MARKDOWN_TYPE,
    icon: MarkdownFile,
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: '#393f4d',
    ext: ['md', 'mdx'],
  },
  {
    type: PDF_TYPE,
    icon: PdfFile,
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: '#ff4d4f',
    ext: ['pdf'],
  },
  {
    type: PPT_TYPE,
    icon: PptFile,
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: '#ff6e31',
    ext: ['ppt', 'pptx'],
  },
  {
    type: WORD_TYPE,
    icon: WordFile,
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: '#1677ff',
    ext: ['doc', 'docx'],
  },
  {
    type: ZIP_TYPE,
    icon: ZipFile,
    iconSize: DEFAULT_ICON_SIZE,
    iconColor: '#fab714',
    ext: ['zip', 'rar', '7z', 'tar', 'gz'],
  },
  {
    type: VIDEO_TYPE,
    icon: VideoFile,
    iconSize: 28,
    iconColor: '#ff4d4f',
    ext: ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'],
  },
  {
    type: AUDIO_TYPE,
    icon: AudioFile,
    iconSize: 28,
    iconColor: '#ffdc04',
    ext: ['mp3', 'wav', 'flac', 'ape', 'aac', 'ogg'],
  },
]

export const parseSize = (size: number = 0) => {
  let retSize = size
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
  let unitIndex = 0

  while (retSize >= 1024 && unitIndex < units.length - 1) {
    retSize /= 1024
    unitIndex++
  }

  return `${retSize.toFixed(0)} ${units[unitIndex]}`
}

export const parseFileName = (str: string = '') => {
  const match = str.match(/^(.*)\.[^.]+$/)
  return {
    fileName: match ? match[1] : str,
    fileNameSuffix: match ? str.slice(match[1].length) : '',
  }
}

export const matchExt = (suffix: string, ext: string[]) => {
  return ext.some((e) => suffix.toLowerCase() === `.${e}`)
}

export const getIconState = (fileNameSuffix: string) => {
  const presetIconState = PRESET_FILE_ICONS.find((icon) =>
    matchExt(fileNameSuffix, icon.ext)
  )

  return {
    type: presetIconState?.type ?? UNKNOWN_TYPE,
    icon: presetIconState?.icon ?? UnknownFile,
    iconColor: presetIconState?.iconColor ?? DEFAULT_ICON_COLOR,
    iconSize: presetIconState?.iconSize ?? DEFAULT_ICON_SIZE,
  }
}
