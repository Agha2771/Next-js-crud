'use client'

import { useState } from 'react'
import { Modal } from '@mantine/core'
import { post } from '../../../lib/requests'

interface DeleteModalProps {
  show: boolean
  onClose: () => void
  banner?: string
  onSuccess: () => void
}

interface DeleteResponse {
  success: boolean
  message: string
}

export function DeleteModal({ show, onClose, banner, onSuccess }: DeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!banner) {
      console.error('Banner ID is undefined')
      return
    }

    try {
      setIsDeleting(true)
      const response = await post<DeleteResponse>(`/banners/delete/${banner}`, {})
      
      if (response) {
        onSuccess()
        onClose()
      }
    } catch (error) {
      console.error('Error deleting banner:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Modal
      opened={show}
      onClose={onClose}
      title="Confirm Delete"
      size="sm"
      centered
    >
      <div className="space-y-4">
        <p>Are you sure you want to delete this banner?</p>
        {/* <p className="text-sm text-gray-500">Banner ID: {banner}</p> */}
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
            onClick={handleDelete}
            disabled={isDeleting || !banner}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  )
}