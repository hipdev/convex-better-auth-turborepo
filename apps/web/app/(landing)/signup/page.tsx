'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authClient } from '../../../lib/auth-client'

type FormErrors = {
  email?: string[]
  password?: string[]
  repeatPassword?: string[]
  name?: string[]
  _form?: string[]
}

export default function Home() {
  const [errors, setErrors] = useState<FormErrors>({})
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const repeatPassword = formData.get('repeatPassword') as string
    const name = formData.get('name') as string

    // Reset errors
    setErrors({})

    // Validate fields
    if (!email || !password || !repeatPassword || !name) {
      setErrors({
        _form: ['Please complete all fields']
      })
      return
    }

    if (password !== repeatPassword) {
      setErrors({
        repeatPassword: ['Passwords do not match']
      })
      return
    }

    try {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/dashboard'
      })

      if (error) {
        setErrors({
          _form: [error.message || 'Error registering user']
        })
        return
      }

      router.push('/dashboard')
    } catch (error) {
      setErrors({
        _form: ['An error occurred while registering the user']
      })
    }
  }

  return (
    <div className='grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
      <div className='row-start-2 flex flex-col items-center gap-[32px] sm:items-start'>
        <div className='w-80'>
          <form onSubmit={handleSubmit}>
            <div className='space-y-4'>
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
              <div>
                <label htmlFor='repeatPassword' className='block text-sm font-medium'>
                  Repeat Password
                </label>
                <input
                  id='repeatPassword'
                  name='repeatPassword'
                  type='password'
                  required
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                />
                {errors.repeatPassword && (
                  <div className='mt-1 text-sm text-red-500'>
                    {errors.repeatPassword.join(', ')}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor='name' className='block text-sm font-medium'>
                  Name
                </label>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                />
                {errors.name && (
                  <div className='mt-1 text-sm text-red-500'>{errors.name.join(', ')}</div>
                )}
              </div>
              {errors._form && (
                <div className='text-sm text-red-500'>{errors._form.join(', ')}</div>
              )}
              <button
                type='submit'
                className='w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
              >
                Sign up
              </button>
            </div>
          </form>

          <Link href='/login' className='mt-10 block hover:underline'>
            Already have an account?
          </Link>

          <div className='my-10 text-center'> ---- </div>
          <div>
            <button
              type='button'
              onClick={async () => {
                const data = await authClient.signIn.social({
                  provider: 'google',
                  callbackURL: '/dashboard'
                })
                console.log(data, 'res from google')
              }}
              className='w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
            >
              Sign up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
