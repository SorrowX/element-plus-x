export function getStyleNumber(value: string | number) {
  const num = Number(value)
  if (Number.isNaN(num)) {
    return value
  } else {
    return `${value}px`
  }
}
