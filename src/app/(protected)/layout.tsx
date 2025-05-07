'use client'

import '../globals.css'
import { AuthProvider } from '../components/AuthProvider'
import { MantineProvider } from '@mantine/core'
import { ToastProvider } from '../components/ToastProvider'
import { Topbar } from '../components/TopBar'
import { Sidebar } from '../components/SideBar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MantineProvider>
        {/* <ToastProvider /> */}
        <div className="min-h-screen">
          <Topbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </MantineProvider>
    </AuthProvider>
  )
}
