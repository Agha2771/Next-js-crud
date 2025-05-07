'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { showSuccess } from '../lib/toast'

type User = {
  id: string
  email: string
}

type AuthObject = {
  token: string | null
  user: User | null
}

type AuthContextType = {
  auth: AuthObject
  login: (token: string) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  auth: { token: null, user: null },
  login: () => {},
  logout: () => {},
  loading: true,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthObject>({ token: null, user: null })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setAuth({ token: storedToken, user: JSON.parse(storedUser) })
    }
    setLoading(false)
  }, [])

  const fetchUser = async (jwt: string) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    const user = res.data.data
    localStorage.setItem('user', JSON.stringify(user))
    setAuth({ token: jwt, user })
  }

  const login = async (jwt: string) => {
    localStorage.setItem('token', jwt)
    await fetchUser(jwt)
    router.push('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuth({ token: null, user: null })
    showSuccess('Logout successful!')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
