import { noop } from '@element-plus/utils/common'

/**
 * 将一个方法进行节流
 *
 * @param method 需要节流的方法，需自行绑定 this
 * @param interval 节流后的触发间隔，默认 16 ms (1 帧)
 *
 * @returns 节流后的方法
 */
export function throttle<T extends (...args: any[]) => any>(
  method: T,
  interval = 16
): (...args: Parameters<T>) => void {
  if (typeof method !== 'function') {
    return noop
  }

  const invoke = (...args: Parameters<T>) => {
    method(...args)
  }

  if (interval <= 0) {
    return debounceMinor(invoke)
  }

  let lastCall = 0
  let timer: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    const current = Date.now()
    const elapsed = current - lastCall

    clearTimeout(timer)

    if (elapsed >= interval) {
      lastCall = current
      invoke(...args)
    } else {
      timer = setTimeout(() => {
        lastCall = Date.now()
        invoke(...args)
      }, Math.max(0, interval - elapsed))
    }
  }
}

/**
 * 将一个方法进行防抖
 *
 * @param method 需要防抖的方法，需自行绑定 this
 * @param delay 防抖的限制时间，默认 100ms
 *
 * @returns 防抖后的方法
 */
export function debounce<T extends (...args: any[]) => any>(
  method: T,
  delay = 100
): (...args: Parameters<T>) => void {
  if (typeof method !== 'function') {
    return noop
  }

  const invoke = (...args: Parameters<T>) => {
    method(...args)
  }

  if (delay <= 0) {
    return debounceMinor(invoke)
  }

  let timer: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      invoke(...args)
    }, delay)
  }
}

/**
 * 对给定的方法进行微任务级别的防抖
 *
 * @param method 需要防抖的方法，需自行绑定 this
 *
 * @returns 防抖后的方法
 */
export function debounceMinor<T extends (...args: any[]) => any>(method: T) {
  if (typeof method !== 'function') {
    return method
  }

  let called = false
  let lastArgs: Parameters<T>
  let promise: Promise<Awaited<ReturnType<T>>>

  return function (...args: Parameters<T>) {
    lastArgs = args

    if (!called) {
      called = true
      promise = Promise.resolve().then(() => {
        called = false
        promise = undefined!

        return method(...lastArgs)
      })
    }

    return promise
  }
}
