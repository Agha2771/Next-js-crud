import { toast } from 'sonner'

export const showSuccess = (message: string) => {
  toast.success(message)
}

export const showError = (message: string) => {
  toast.error(message)
}

export const showValidationErrors = (errors: string[]) => {
  errors.forEach(err => toast.error(err))
}
