'use client'

import { Toaster } from 'sonner'
import { ReactNode } from 'react'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster position="top-right" richColors />
      {children}
    </>
  )
}
