'use client'

import Link from 'next/link'
import { authClient } from '@repo/ui/lib/auth-client'
import { useEffect, useState } from 'react'

export const HeaderNav = () => {
  const { data: session, isPending } = authClient.useSession()
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    if (!isPending) {
      setIsMounted(false)
    }
  }, [isPending])

  if (isMounted) {
    return null
  }

  if (session && !session?.user?.isAnonymous) {
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
