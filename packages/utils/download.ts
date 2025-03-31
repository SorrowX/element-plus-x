import { ElMessage } from 'element-plus'
import { useAxios } from '@vueuse/integrations/useAxios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export type DownloadOptions = Partial<AxiosRequestConfig> & {
  url: string
  fileName: string
  instance?: AxiosInstance
}

export const download = (options: DownloadOptions) => {
  const { url, params, fileName, instance, ...other } = options
  const { execute } = instance ? useAxios(instance) : useAxios()
  return execute(url, {
    method: 'get',
    responseType: 'blob',
    params,
    timeout: 1000 * 60 * 5,
    ...other,
  }).then((response) => {
    downloadBlobFile(response.data.value, fileName)
  })
}

export function downloadBlobFile(blob: Blob, fileName: string) {
  if (blob && blob.size === 0) {
    ElMessage.error('Download Error!')
    return
  }

  const url = window.URL.createObjectURL(
    blob instanceof Blob ? blob : new Blob([blob])
  )
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  window.setTimeout(() => {
    URL.revokeObjectURL(url) // 释放临时文件，防止内存泄漏
    document.body.removeChild(link)
  }, 0)
}
