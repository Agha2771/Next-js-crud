'use client'

import { useEffect, useState } from 'react'
import { Banner } from '../../../types/banner'
import { get } from '../../../lib/requests'
import Image from 'next/image'

interface ActiveBannerPreviewProps {
  refreshKey: number
}

export function ActiveBannerPreview({ refreshKey }: ActiveBannerPreviewProps) {
  const [activeBanner, setActiveBanner] = useState<Banner | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActiveBanner()
  }, [refreshKey])

  const fetchActiveBanner = async () => {
    try {
      const response = await get('/banners/list')
      const active = response.data.data.find((banner: Banner) => banner.is_active)
      console.log(active , 'active')
      setActiveBanner(active || null)
    } catch (error) {
      console.error('Error fetching active banner:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return null
  }

  if (!activeBanner) {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="mb-0">Currently Active Banner</h5>
        </div>
        <div className="card-body">
          <div id="no-active-banner" className="text-center py-3">
            <p className="mb-0">No active banner found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Currently Active Banner</h5>
      </div>
      <div className="card-body">
        <div id="active-banner-preview">
          <div
            className="flash-sale-banner-main"
            id="active-flash-sale-banner"
            style={{
              visibility: 'visible',
              top: 0,
              position: 'relative',
              height: '50px',
              backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE}${activeBanner.desktop_banner})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 20px'
            }}
          >
            <span className="flash-close-btn" style={{ position: 'absolute', right: '10px', top: '10px' }}>
              <svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.965 1.03711L1.03906 26.963" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.03906 1.03711L26.965 26.963" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            
            <div className="flash_sale_banner_content" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {activeBanner.flash_image && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL_IMAGE}${activeBanner.flash_image}`}
                  alt="Flash Sale"
                  width={20}
                  height={20}
                  style={{ width: '20px', height: '20px' }}
                />
              )}
              <span style={{ color: 'white' }}>{activeBanner.banner_text}</span>
              <span style={{ 
                backgroundColor: '#fff', 
                color: '#000',
                padding: '2px 8px',
                borderRadius: '4px',
                marginLeft: '8px'
              }}>{activeBanner.banner_text}</span>
              <span style={{ 
                backgroundColor: '#ff6b00',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '4px'
              }}>{activeBanner.flash_sales_text}</span>
            </div>

            <div className="flash-sale-banner-timer" style={{ display: 'flex', gap: '8px' }}>
              {['Hours', 'Min', 'Sec'].map((unit, index) => (
                <div key={`timer-block-${index}`} style={{ textAlign: 'center' }}>
                  <span style={{ 
                    backgroundColor: '#0052CC',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>00</span>
                  <div style={{ 
                    color: 'white',
                    fontSize: '12px',
                    marginTop: '2px'
                  }}>{unit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}