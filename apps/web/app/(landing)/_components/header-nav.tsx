'use client'

import Link from 'next/link'
import { authClient } from '@repo/ui/lib/auth-client'

export const HeaderNav = () => {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) return null

  if (session && !session.user.isAnonymous) {
    return (
      <nav className='flex space-x-4'>
        <Link href='/' className='text-gray-300 hover:text-white'>
          Chat
        </Link>
        <Link href='/dashboard' className='text-gray-300 hover:text-white'>
          Dashboard
        </Link>
        <button
          type='button'
          onClick={() => authClient.signOut()}
          className='text-gray-300 hover:text-white'
        >
          Logout
        </button>
      </nav>
    )
  }

  return (
    <nav className='flex space-x-4'>
      <Link href='/signup' className='text-gray-300 hover:text-white'>
        SignUp
      </Link>
      <Link href='/login' className='text-gray-300 hover:text-white'>
        Login
      </Link>
      <Link href='/' className='text-gray-300 hover:text-white'>
        Chat
      </Link>
    </nav>
  )
}
