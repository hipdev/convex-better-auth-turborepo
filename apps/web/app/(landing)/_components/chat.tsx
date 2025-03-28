'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@repo/backend/convex/_generated/api'
import { useEffect, useRef, useState } from 'react'
import { authClient } from '../../../lib/auth-client'
import type { Id } from '@repo/backend/convex/_generated/dataModel'

export function Chat() {
  const { data: session } = authClient.useSession()

  const messages = useQuery(api.chat.getMessages)
  const sendMessage = useMutation(api.chat.sendMessage)
  const deleteMessage = useMutation(api.chat.deleteMessage)
  const [input, setInput] = useState('')

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()

    let userId = session?.user.id as Id<'user'>

    if (!session?.user.id) {
      // Create anonymous user
      const user = await authClient.signIn.anonymous()
      userId = user.data?.user?.id as Id<'user'>
    }

    if (input.trim()) {
      await sendMessage({
        userId,
        message: input,
        name: session?.user.name || 'Anonymous'
      })
      setInput('')
    }
  }

  const handleDelete = async (messageId: Id<'chat'>) => {
    const session = await authClient.getSession()
    if (!session.data?.session.token) {
      return
    }
    await deleteMessage({
      messageId,
      sessionToken: session.data?.session.token
    })
  }

  // Scroll to bottom with every new message
  const chatRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className='flex h-[400px] flex-col overflow-hidden rounded-lg border border-gray-700'>
      <div className='flex-1 overflow-y-auto bg-gray-800 p-4' ref={chatRef}>
        {messages?.map((message) => (
          <div
            key={message._id}
            className={`mb-4 ${message.userId === session?.user.id ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`group relative inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                message.userId === session?.user.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              } }`}
            >
              {message.message}
              <div className='mt-1 text-xs text-gray-300'>
                {new Date(message.createdAt).toLocaleTimeString()}
              </div>
              <div className='text-xs text-gray-300'>{message.name || 'Anonymous'}</div>
              {message.userId === session?.user.id && (
                <button
                  type='button'
                  className='absolute -right-1 -top-1 hidden cursor-pointer rounded-full bg-red-800 px-1 text-xs text-white transition-colors hover:bg-red-700 group-hover:block'
                  onClick={() => handleDelete(message._id)}
                >
                  x
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className='bg-gray-900 p-4'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='flex-1 rounded-lg bg-gray-800 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600'
            placeholder='Type a message...'
          />
          <button
            type='submit'
            className='cursor-pointer rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}
