export function composeExport<
  T0 extends Record<string, any>,
  T1 extends Record<string, any>
>(s0: T0, s1: T1): T0 & T1 {
  return Object.assign(s0, s1)
}
