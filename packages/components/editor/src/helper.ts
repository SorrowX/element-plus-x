import type { ITagRule, MentionOption } from './types'

export const filterOption = (query: string, option: MentionOption): boolean => {
  const lowerCase = query.toLowerCase()
  const label = option.label || option.id
  return label.toLowerCase().includes(lowerCase)
}

export const getTextContent = (
  html: string,
  rules: ITagRule[] = []
): string => {
  if (!rules.some((rule) => rule.tag === 'br')) {
    rules = rules.concat({
      tag: 'br',
      attr: 'no-attr',
      defaultValue: '\n',
    })
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  rules.forEach(({ tag, attr, defaultValue }) => {
    const elements = doc.querySelectorAll(tag)
    elements.forEach((el) => {
      const attrValue = el.getAttribute(attr) ?? defaultValue ?? ''
      el.replaceWith(attrValue)
    })
  })

  return doc.body.textContent!.trim()
}
