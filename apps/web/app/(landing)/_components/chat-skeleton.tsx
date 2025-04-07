export const ChatSkeleton = () => {
  return (
    <div className='flex h-[70vh] flex-col overflow-hidden rounded-lg border border-gray-700'>
      <div className='flex-1 overflow-y-auto bg-neutral-900 p-4'>
        <div className='mb-4 text-left'>
          <div className='inline-block max-w-[80%] animate-pulse rounded-lg bg-gray-700 px-4 py-2 text-gray-100'>
            <div className='h-4 w-48 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-24 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-20 rounded bg-gray-600'></div>
          </div>
        </div>

        {/* Right-aligned message skeleton */}
        <div className='mb-4 text-right'>
          <div className='inline-block max-w-[80%] animate-pulse rounded-lg bg-blue-600 px-4 py-2 text-white'>
            <div className='h-4 w-32 rounded bg-blue-500'></div>
            <div className='mt-1 h-3 w-24 rounded bg-blue-500'></div>
            <div className='mt-1 h-3 w-20 rounded bg-blue-500'></div>
          </div>
        </div>

        <div className='mb-4 text-left'>
          <div className='inline-block max-w-[80%] animate-pulse rounded-lg bg-gray-700 px-4 py-2 text-gray-100'>
            <div className='h-4 w-56 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-24 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-20 rounded bg-gray-600'></div>
          </div>
        </div>
        <div className='mb-4 text-left'>
          <div className='inline-block max-w-[80%] animate-pulse rounded-lg bg-gray-700 px-4 py-2 text-gray-100'>
            <div className='h-4 w-48 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-24 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-20 rounded bg-gray-600'></div>
          </div>
        </div>

        {/* Right-aligned message skeleton */}
        <div className='mb-4 text-right'>
          <div className='inline-block max-w-[80%] animate-pulse rounded-lg bg-blue-600 px-4 py-2 text-white'>
            <div className='h-4 w-32 rounded bg-blue-500'></div>
            <div className='mt-1 h-3 w-24 rounded bg-blue-500'></div>
            <div className='mt-1 h-3 w-20 rounded bg-blue-500'></div>
          </div>
        </div>

        <div className='mb-4 text-left'>
          <div className='inline-block max-w-[80%] animate-pulse rounded-lg bg-gray-700 px-4 py-2 text-gray-100'>
            <div className='h-4 w-56 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-24 rounded bg-gray-600'></div>
            <div className='mt-1 h-3 w-20 rounded bg-gray-600'></div>
          </div>
        </div>
      </div>
      <form className='bg-black p-4'>
        <div className='flex gap-2'>
          <div className='flex-1 animate-pulse rounded-lg bg-neutral-900 px-4 py-2'></div>
          <div className='animate-pulse rounded-lg bg-blue-600 px-6 py-2 text-transparent'>
            Send
          </div>
        </div>
      </form>
    </div>
  )
}
