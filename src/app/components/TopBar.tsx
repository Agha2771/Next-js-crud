'use client'

import { useAuth } from './AuthProvider'
import { useEffect } from 'react'

export const Topbar = () => {
  const { auth, logout } = useAuth()

  useEffect(() => {
   if (!auth.user) {
    window.location.href = '/'
   }
  }, [auth])
  
  return (
    <div className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="text-black font-semibold text-xl">Banner Management</div>
      {auth.user && (
        <div className="flex items-center gap-4">
          {/* <span>{auth.user.email}</span> */}
          <button 
            onClick={logout}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:ring-blue-300 font-medium rounded-sm cursor-pointer text-sm px-5 py-1 
            me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}