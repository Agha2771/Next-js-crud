'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { post } from '../lib/requests'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    await post('/auth/register', { email, password })
    router.push('/')
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-gray-100 p-10 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="text-black w-full px-4 py-3 mb-4 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="text-black w-full px-4 py-3 mb-4 rounded-lg bg-white border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-600 text-white py-3 rounded-lg font-medium shadow hover:bg-green-700 transition"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  )
}
