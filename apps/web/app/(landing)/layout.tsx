import Link from 'next/link'
import { HeaderNav } from './_components/header-nav'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-50 bg-neutral-900 shadow'>
        <div className='container mx-auto flex items-center justify-between px-4 py-2'>
          <Link href='/' className='text-2xl font-bold'>
            Chat - Next.js + Convex + BetterAuth
          </Link>
          <HeaderNav />
        </div>
      </header>
      <main className='container mx-auto flex-1 px-4 py-6'>{children}</main>
      <footer className='mt-8 bg-neutral-900 py-4'>
        <div className='container mx-auto px-4 text-center text-gray-300'>
          <p> 2025 Chat - Next.js + Convex + BetterAuth. MIT License.</p>
        </div>
      </footer>
    </div>
  )
}
