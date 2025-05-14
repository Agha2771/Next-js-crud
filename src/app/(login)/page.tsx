'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../components/AuthProvider'
import { useRouter } from 'next/navigation'
import { post } from '../lib/requests'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, auth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (auth.token) {
      router.replace('/dashboard')
    }
  }, [auth.token])

  const handleLogin = async () => {
    interface LoginResponse {
      access_token: string
      refresh_token: string
    }
    const res = await post<LoginResponse>('/auth/login', { email, password })
    login(res.access_token)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-gray-100 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="text-black w-full px-4 py-3 mb-4 rounded-lg bg-white border border-gray-300"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="text-black w-full px-4 py-3 mb-4 rounded-lg bg-white border border-gray-300"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  )
}
