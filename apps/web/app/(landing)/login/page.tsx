'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LoginGoogle } from '@repo/ui/atoms/login-google'
import { authClient } from '@repo/ui/lib/auth-client'

type FormErrors = {
  email?: string[]
  password?: string[]
  _form?: string[]
}

export default function LoginPage() {
  const [errors, setErrors] = useState<FormErrors>({})
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Reset errors
    setErrors({})

    // Validate fields
    if (!email || !password) {
      setErrors({
        _form: ['Please complete all fields']
      })
      return
    }

    try {
      startTransition(async () => {
        const { error } = await authClient.signIn.email(
          {
            email,
            password
          },
          {
            onSuccess: (ctx) => {
              const authToken = ctx.response.headers.get('set-auth-token') // get the token from the response headers
              // Store the token securely (e.g., in localStorage)
              if (authToken) {
                localStorage.setItem('bearer_token', authToken)
              }
            }
          }
        )

        if (error) {
          setErrors({
            _form: [error.message || 'Error logging in']
          })
          return
        }

        router.push('/dashboard')
      })
    } catch (error) {
      setErrors({
        _form: ['An error occurred while logging in', error as string]
      })
    }
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-4'>
        <h1 className='text-center text-2xl font-bold'>Log in</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
            />
            {errors.email && (
              <div className='mt-1 text-sm text-red-500'>{errors.email.join(', ')}</div>
            )}
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
            />
            {errors.password && (
              <div className='mt-1 text-sm text-red-500'>{errors.password.join(', ')}</div>
            )}
          </div>
          {errors._form && <div className='text-sm text-red-500'>{errors._form.join(', ')}</div>}
          <button
            type='submit'
            className='w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
            disabled={isPending}
          >
            {isPending ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <div className='text-center'>
          <span className='text-sm text-gray-600'>Don&apos;t have an account? </span>
          <Link href='/signup' className='text-sm text-blue-600 hover:text-blue-700'>
            Sign up here
          </Link>
        </div>

        <div className='my-10 text-center'> ---- </div>
        <div>
          <LoginGoogle />
        </div>
      </div>
    </div>
  )
}
