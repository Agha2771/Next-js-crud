'use client'

import { useEffect, useState } from 'react'
import { Banner, BannerFormData } from '../../../types/banner'
import { Modal } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { post } from '../../../lib/requests'
import { showSuccess } from '../../../lib/toast'


const bannerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  banner_text: z.string().min(1, 'Banner text is required'),
  flash_sales_text: z.string().min(1, 'Flash sales text is required'),
  flash_banner_color: z.string(),
  flash_colortimer_color: z.string(),
  start_time: z.string(),
  end_time: z.string(),
})

interface BannerModalProps {
  show: boolean
  onClose: () => void
  banner?: Banner | null
  isEditing: boolean
  onSuccess: () => void
}

const formatDateForInput = (isoString: string) => {
  if (!isoString) return ''
  return new Date(isoString).toISOString().slice(0, 16)
}

export function BannerModal({ show, onClose, banner, isEditing, onSuccess }: BannerModalProps) {
  console.log('BannerModal render - show:', show) // Debug log
  
  const [previewData, setPreviewData] = useState<Partial<BannerFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      flash_banner_color: '#ffffff',
      flash_colortimer_color: '#000000',
    }
  })

  useEffect(() => {
    if (banner && isEditing) {
      reset({
        name: banner.name,
        banner_text: banner.banner_text,
        flash_sales_text: banner.flash_sales_text,
        flash_banner_color: banner.flash_banner_color,
        flash_colortimer_color: banner.flash_colortimer_color,
        start_time: formatDateForInput(banner.start_at),
        end_time: formatDateForInput(banner.end_at),
      })
    } else {
      reset({
        name: '',
        banner_text: '',
        flash_sales_text: '',
        flash_banner_color: '#ffffff',
        flash_colortimer_color: '#000000',
        start_time: '',
        end_time: '',
      })
    }
  }, [banner, isEditing, reset])

  // Replace the separate watch and useEffect with a single subscription
  useEffect(() => {
    const subscription = watch((value) => {
      setPreviewData(value)
    })
    
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      
      // Format dates to ISO strings
      const formattedData = {
        ...data,
        start_time: data.start_time ? new Date(data.start_time).toISOString() : '',
        end_time: data.end_time ? new Date(data.end_time).toISOString() : ''
      }
      
      // Append form fields
      Object.keys(formattedData).forEach(key => {
        formData.append(key, formattedData[key])
      })

      // Append files if present
      const fileInputs = ['flash_image', 'desktop_banner', 'mobile_banner']
      fileInputs.forEach(input => {
        const files = document.querySelector<HTMLInputElement>(`input[name="${input}"]`)?.files
        if (files?.[0]) {
          formData.append(input, files[0])
        }
      })

      const url = isEditing 
        ? `/banners/update/${banner?._id}`
        : '/banners/create'

      await post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      showSuccess(isEditing ? 'Banner updated successfully!' : 'Banner created successfully!')
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error saving banner:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal
      opened={show}
      onClose={onClose}
      title={isEditing ? 'Edit Banner' : 'Create Banner'}
      size="xl"
      centered
      zIndex={1000}
      overlayProps={{
        opacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <PreviewContainer previewData={previewData} /> */}

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Banner Name</label>
            <input
              {...register('name')}
              className="w-full p-2 border rounded"
              placeholder="Enter banner name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name.message}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Banner Text</label>
            <input
              {...register('banner_text')}
              className="w-full p-2 border rounded"
              placeholder="Enter banner text"
            />
            {errors.banner_text && (
              <span className="text-red-500 text-sm">{errors.banner_text.message}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Flash Sales Text</label>
            <input
              {...register('flash_sales_text')}
              className="w-full p-2 border rounded"
              placeholder="Enter flash sales text"
            />
            {errors.flash_sales_text && (
              <span className="text-red-500 text-sm">{errors.flash_sales_text.message}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Flash Text Background Color</label>
            <input
              type="color"
              {...register('flash_banner_color')}
              className="w-full h-10 p-1 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Flash Sales Image</label>
            <input
              type="file"
              name="flash_image"
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Desktop Banner</label>
            <input
              type="file"
              name="desktop_banner"
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Mobile Banner</label>
            <input
              type="file"
              name="mobile_banner"
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Start Time</label>
            <input
              type="datetime-local"
              {...register('start_time')}
              className="w-full p-2 border rounded"
            />
            {errors.start_time && (
              <span className="text-red-500 text-sm">{errors.start_time.message}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">End Time</label>
            <input
              type="datetime-local"
              {...register('end_time')}
              className="w-full p-2 border rounded"
            />
            {errors.end_time && (
              <span className="text-red-500 text-sm">{errors.end_time.message}</span>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Counter Background Color</label>
            <input
              type="color"
              {...register('flash_colortimer_color')}
              className="w-full h-10 p-1 border rounded"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}