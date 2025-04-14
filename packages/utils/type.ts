export function isUndef(v: any): boolean {
  return v === undefined || v === null
}
export function isDef(v: any): boolean {
  return v !== undefined && v !== null
}
