import type { MentionOption } from './types'

export const filterOption = (query: string, option: MentionOption): boolean => {
  const lowerCase = query.toLowerCase()
  const label = option.label || option.id
  return label.toLowerCase().includes(lowerCase)
}
