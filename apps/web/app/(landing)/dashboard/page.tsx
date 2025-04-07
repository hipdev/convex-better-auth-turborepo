'use client'
import { authClient } from '../../../lib/auth-client'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const {
    data: session,
    isPending //loading state
  } = authClient.useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login') // redirect to login page
        }
      }
    })
  }

  if (isPending) {
    return null
  }

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <div className='w-full max-w-md space-y-4'>
        <h1 className='text-2xl font-bold'>Dashboard (Protected page)</h1>
        <div className='space-y-2'>
          <p>
            <span className='font-medium'>Name:</span> {session?.user.name}
          </p>
          <p>
            <span className='font-medium'>Email:</span> {session?.user.email}
          </p>
        </div>
        {session?.user.isAnonymous ? (
          <button
            onClick={handleSignOut}
            className='w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700'
          >
            Link account with Google
          </button>
        ) : (
          <button
            onClick={handleSignOut}
            className='w-full rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700'
          >
            Log out
          </button>
        )}
      </div>
    </div>
  )
}
