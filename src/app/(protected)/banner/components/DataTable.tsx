'use client'

import { useEffect, useState } from 'react'
import { Banner } from '../../../types/banner'
import { DataTable as MantineDataTable } from 'mantine-datatable'
import { format } from 'date-fns'
import { get } from '../../../lib/requests'

interface DataTableProps {
  onEdit: (banner: Banner) => void
  onDelete: (banner: Banner) => void
  refreshKey: number
}

export function DataTable({ onEdit, onDelete, refreshKey }: DataTableProps) {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBanners()
  }, [refreshKey])

  const fetchBanners = async () => {
    try {
      const response = await get('/banners/list')
      console.log(response.data.data)
      setBanners(response.data.data)
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Start Time</th>
            <th className="px-6 py-4">End Time</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.length === 0 ? (
            <tr className="bg-white border-b hover:bg-gray-50">
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                No banners found
              </td>
            </tr>
          ) : (
            banners.map((banner) => (
              <tr key={banner._id} className="bg-white border-b hover:bg-gray-50 text-black">
                <td className="px-6 py-4 text-black">{banner.name}</td>
                <td className="px-6 py-4 text-black">
                  {banner.start_at ? format(new Date(banner.start_at), 'PPp') : '-'}
                </td>
                <td className="px-6 py-4 text-black">
                  {banner.end_at ? format(new Date(banner.end_at), 'PPp') : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    banner.is_active 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {banner.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(banner)}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(banner)}
                      disabled={banner.is_active}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {loading && (
        <div className="flex items-center justify-center p-4 text-gray-500">
          Loading banners...
        </div>
      )}
    </div>
  )
}