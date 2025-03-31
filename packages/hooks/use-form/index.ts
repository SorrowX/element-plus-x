import { inject } from 'vue'
import {
  FormContext,
  FormItemContext,
  formContextKey,
  formItemContextKey,
} from 'element-plus'

export type FormItemContextType = FormItemContext | undefined

export const useField = (): FormItemContextType => inject(formItemContextKey)

export type FormContextType = FormContext | undefined

export const useForm = (): FormContextType => inject(formContextKey)
