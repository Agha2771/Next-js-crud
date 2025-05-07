'use client'

import { useAuth } from '../../components/AuthProvider'

export default function Dashboard() {
  const { auth } = useAuth()
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-black text-3xl font-bold mb-2">Dashboard</h1>
      <p className="mb-4 text-black">Hi {auth.user?.email}, You're logged in!</p>
    </div>
  )
}
