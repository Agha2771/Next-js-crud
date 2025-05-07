'use client'

import Link from 'next/link'

export const Sidebar = () => {

  return (
    <div className="w-64 bg-white border-r h-[calc(100vh-64px)] p-4">
      <nav className="space-y-2">
        <Link 
          href="/banner" 
          className="text-black block px-4 py-2 rounded hover:bg-gray-100"
        >
          Banners
        </Link>
      </nav>
    </div>
  )
}