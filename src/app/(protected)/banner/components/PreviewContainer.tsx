'use client'

import { useEffect, useState } from 'react'
import { BannerFormData } from '../../../types/banner'

interface PreviewContainerProps {
  previewData: Partial<BannerFormData>
}

export function PreviewContainer({ previewData }: PreviewContainerProps) {
  const [isMobileView, setIsMobileView] = useState(false)
  const [desktopPreview, setDesktopPreview] = useState<string>('')
  const [mobilePreview, setMobilePreview] = useState<string>('')
  const [flashImagePreview, setFlashImagePreview] = useState<string>('')

  useEffect(() => {
    // Handle file previews
    const desktopBanner = document.querySelector<HTMLInputElement>('input[name="desktop_banner"]')?.files?.[0]
    const mobileBanner = document.querySelector<HTMLInputElement>('input[name="mobile_banner"]')?.files?.[0]
    const flashImage = document.querySelector<HTMLInputElement>('input[name="flash_image"]')?.files?.[0]

    if (desktopBanner) {
      const reader = new FileReader()
      reader.onload = (e) => setDesktopPreview(e.target?.result as string)
      reader.readAsDataURL(desktopBanner)
    }

    if (mobileBanner) {
      const reader = new FileReader()
      reader.onload = (e) => setMobilePreview(e.target?.result as string)
      reader.readAsDataURL(mobileBanner)
    }

    if (flashImage) {
      const reader = new FileReader()
      reader.onload = (e) => setFlashImagePreview(e.target?.result as string)
      reader.readAsDataURL(flashImage)
    }
  }, [previewData])

  return (
    <div className="mb-6">
      <h5 className="mb-3">Live Preview</h5>
      
      <div className="preview-tabs mb-3">
        <button 
          className={`preview-tab ${!isMobileView ? 'active' : ''}`}
          onClick={() => setIsMobileView(false)}
        >
          <i className="fas fa-desktop"></i>
          Desktop View
        </button>
        <button 
          className={`preview-tab ${isMobileView ? 'active' : ''}`}
          onClick={() => setIsMobileView(true)}
        >
          <i className="fas fa-mobile-alt"></i>
          Mobile View
        </button>
      </div>

      <div className={`preview-container ${isMobileView ? 'mobile-view' : ''}`}>
        <div 
          id="flash-sale-banner-1"
          className="flash-sale-banner-main"
          style={{
            backgroundImage: `url(${isMobileView ? mobilePreview : desktopPreview})`,
            visibility: 'visible',
            height: '70px',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <span className="flash-close-btn">
            <svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.965 1.03711L1.03906 26.963" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.03906 1.03711L26.965 26.963" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

          <div className="flash_sale_banner_content">
            {flashImagePreview && (
              <img 
                id="preview-flash-image"
                src={flashImagePreview}
                alt="Flash Sale"
                style={{ maxWidth: '30px' }}
              />
            )}
            <label id="preview-banner-text">
              {previewData.banner_text}
            </label>
            <div className="flash-sale-year">
              <span id="preview-flash-sales-text">
                {previewData.flash_sales_text}
              </span>
              <span 
                className="sale-text"
                style={{ backgroundColor: previewData.flash_banner_color }}
              >
                Flash Sale
              </span>
            </div>
          </div>

          <div className="flash-sale-banner-timer">
            {['Hours', 'Min', 'Sec'].map((unit) => (
              <span key={unit} className="flash-sale-timer-block">
                <span 
                  className={unit === 'Hours' ? 'sale_hour' : unit === 'Min' ? 'sale_minute' : 'sale-second'}
                  style={{ backgroundColor: previewData.flash_colortimer_color }}
                >
                  00
                </span>
                <span className="flash-sale-hour-block">{unit}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
