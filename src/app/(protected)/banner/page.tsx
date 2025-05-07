'use client'

import { useEffect, useState } from 'react'
import { DataTable } from './components/DataTable'
import { BannerModal } from './components/BannerModal'
import { DeleteModal } from './components/DeleteModal'
import { ActiveBannerPreview } from './components/ActiveBannerPreview'
import type { Banner } from '../../types/banner'

export default function Banner() {
  const [showBannerModal, setShowBannerModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner)
    setIsEditing(true)
    setShowBannerModal(true)
  }

  const handleDelete = (banner: Banner) => {
    setSelectedBanner(banner)
    setShowDeleteModal(true)
  }

  const handleCreate = () => {
    console.log('handleCreate clicked')
    setSelectedBanner(null)
    setIsEditing(false)
    setShowBannerModal(true)
    console.log('showBannerModal set to:', true)
  }

  const refreshData = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Banner Management
                </h1>
                <p className="text-sm text-gray-600 mt-1">Manage your banner content</p>
              </div>

              <div>
                <button 
                  onClick={handleCreate}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Banner
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                {/* <ActiveBannerPreview refreshKey={refreshKey} /> */}
              </div>

              <div className="overflow-hidden rounded-lg">
                <DataTable 
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  refreshKey={refreshKey}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BannerModal
        show={showBannerModal}
        onClose={() => {
          console.log('Modal closing')
          setShowBannerModal(false)
        }}
        banner={selectedBanner}
        isEditing={isEditing}
        onSuccess={() => {
          setShowBannerModal(false)
          refreshData()
        }}
      />

      <DeleteModal 
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        banner={selectedBanner?._id}
        onSuccess={() => {
          setShowDeleteModal(false)
          refreshData()
        }}
      />
    </div>
  )
}
