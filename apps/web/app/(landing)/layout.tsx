import Link from 'next/link'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='sticky top-0 z-50 bg-gray-800 shadow'>
        <div className='container mx-auto flex items-center justify-between px-4 py-2'>
          <Link href='/' className='text-2xl font-bold'>
            Chat Demo
          </Link>
          <nav className='flex space-x-4'>
            <a href='/signup' className='text-gray-300 hover:text-white'>
              SignUp
            </a>
            <a href='/login' className='text-gray-300 hover:text-white'>
              Login
            </a>
            <Link href='/' className='text-gray-300 hover:text-white'>
              Chat
            </Link>
          </nav>
        </div>
      </header>
      <main className='container mx-auto flex-1 px-4 py-6'>{children}</main>
      <footer className='mt-8 bg-gray-800 py-4'>
        <div className='container mx-auto px-4 text-center text-gray-300'>
          <p> 2025 Chat Demo. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
