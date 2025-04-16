export const baseUrl = '/element-plus-x/'
// export const baseUrl = '/'

export const defaultLang = 'zh-CN'

export const PREFERRED_LANG_KEY = 'preferred_lang'

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 960,
  xlg: 1280,
  xxl: 1440,
}

export const getHref = (href: string) => {
  return baseUrl === ('/' as string) ? href : `${baseUrl.slice(0, -1)}${href}`
}
