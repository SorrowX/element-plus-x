export type ResizeHandler = (entry: ResizeObserverEntry) => any

const handlerMap = new WeakMap<Element, ResizeHandler>()

function handleResize(entries: ResizeObserverEntry[]) {
  for (let i = 0, len = entries.length; i < len; ++i) {
    const entry = entries[i]
    const handler = handlerMap.get(entry.target)

    if (typeof handler === 'function') {
      handler(entry)
    }
  }
}

let resizeObserver: ResizeObserver | null = null

const createResizeObserver = () => {
  if (!resizeObserver) {
    resizeObserver = new window.ResizeObserver(handleResize)
  }
}

export function observeResize(el: Element, handler: ResizeHandler) {
  handlerMap.set(el, handler)
  resizeObserver?.observe(el)
}

export function unobserveResize(el: Element) {
  if (handlerMap.has(el)) {
    resizeObserver?.unobserve(el)
    handlerMap.delete(el)
  }
}

export function useResize() {
  createResizeObserver()

  return {
    observeResize,
    unobserveResize,
  }
}
