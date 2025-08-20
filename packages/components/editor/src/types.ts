import { ParseOptions } from '@tiptap/pm/model'
import { filterOption } from './helper'
import type { Editor } from '@tiptap/vue-3'
import type { UploadFile } from 'element-plus'

export type IEditor = typeof Editor | any

export type MentionOption = {
  id: string
  label?: string
  disabled?: boolean
  url?: string
  [key: string]: any
}

export type SuggestionOptions = {
  char?: string
  filterOption?: typeof filterOption
  options:
    | MentionOption[]
    | ((options: { query: string }) => Promise<MentionOption[]>)
  slots?: Record<string, any>
  tooltipProps?: Record<string, any>
}

export type EnterValues = {
  html: string
  text: string
  [key: string]: any
}

export type InsertContentOptions = {
  parseOptions?: ParseOptions
  updateSelection?: boolean
  applyInputRules?: boolean
  applyPasteRules?: boolean
}

export type IToolbarList = string[]

export interface ISetImageOptions {
  src: string
  alt?: string
  title?: string
}
export interface IToolbarImage {
  onChange: (
    uploadFile: UploadFile,
    callback: (options: ISetImageOptions) => void
  ) => void
}

export interface IToolbarVideo {
  onChange: (
    uploadFile: UploadFile,
    callback: (options: ISetVideOptions) => void
  ) => void
}

export interface IToolbarConfigure {
  image: IToolbarImage
  video: IToolbarVideo
  showTip?: boolean
}

export interface IToolBarContext {
  editor: Editor
  configure: IToolbarConfigure
}

export interface ISetVideOptions {
  src?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  poster?: string
  width?: number | string
  height?: number | string
  preload?: 'auto' | 'metadata' | 'none'
}

export interface ITagRule {
  tag: string
  attr: string
  defaultValue?: string
}
