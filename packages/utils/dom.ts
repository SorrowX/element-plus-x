export function findParentByClassName(element: HTMLElement, className: string) {
  let current = element.parentElement
  while (current && current.tagName.toLowerCase() !== 'body') {
    if (current.classList.contains(className)) {
      return current
    }
    current = current.parentElement
  }
  return null
}
