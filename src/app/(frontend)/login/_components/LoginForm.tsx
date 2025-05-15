'use client'

import { useRouter } from 'next/navigation'
import React, { ReactElement, useState } from 'react'
import SubmitButton from '../../_components/SubmitButton'
import { login, LoginResponse } from '../_actions/login'

export default function LoginForm(): ReactElement {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result: LoginResponse = await login({ email, password })

    setIsPending(false)

    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'An error occured')
    }
  }

  return (
    <div className="flex gap-8 min-h-full flex-col justify-center items-center">
      <div className="text-3xl">Login</div>
      <div className="w-full mx-auto sm:max-w-sm">
        <form action="" className="flex flex-col gap-4" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input className="w-full textInput" type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col gap-1 mb-8">
            <label htmlFor="password">Password</label>
            <input className="w-full textInput" type="password" name="password" id="password" />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <SubmitButton loading={isPending} text="Login" />
        </form>
        <p className="mt-10 text-center text-sm text-gray-400">
          Dont have an account?{' '}
          <a href="/signup" className="text-blue-500">
            Signup
          </a>
        </p>
      </div>
    </div>
  )
}
