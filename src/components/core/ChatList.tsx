import { Chat } from '@/components/core'
import { useGetMessages } from '@/hooks'
import { useInMemoryMessages, useSocket } from '@/state'
import { shortenDate } from '@/utils'
import { Alert02Icon, Loading03Icon } from 'hugeicons-react'

export function ChatList() {
  const { messages, error, isLoading } = useGetMessages()
  const inMemoryMessages = useInMemoryMessages((s) => s.messages)
  const { isProcessing } = useSocket()

  if (isLoading) return <ChatListLoading />
  if (error) return <ChatListError />
  if (messages.length === 0 && inMemoryMessages.length === 0) return <ChatListEmpty />

  return (
    <>
      {messages.map((message, idx) => (
        <Chat key={`message-${idx}`} role={message.role} timestamp={shortenDate(message.timestamp)}>
          {message.text}
        </Chat>
      ))}
      {inMemoryMessages.map((message, idx) => (
        <Chat
          key={`mem-message-${idx}`}
          role={message.role}
          timestamp={shortenDate(message.timestamp)}
          isLoading={message.isLoading}
        >
          {message.text}
        </Chat>
      ))}
      {isProcessing && <Chat role="assistant" isProcessing />}
    </>
  )
}

function ChatListLoading() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-1.5 p-3">
      <Loading03Icon strokeWidth={2} size={20} className="animate-spin text-default-400" />
      <p className="text-sm text-content4-foreground">Wait a second, getting messages...</p>
    </div>
  )
}

function ChatListError() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-3">
      <Alert02Icon strokeWidth={2} size={20} className="text-danger-500" />
      <p className="text-sm text-danger-600">Something went wrong while getting messages !</p>
    </div>
  )
}

function ChatListEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-3">
      <p className="w-fit bg-gradient-to-r from-default-900 via-cyan-600 to-blue-700 bg-clip-text text-xs font-semibold uppercase text-transparent">
        empty chat
      </p>
      <p className="text-sm text-content4-foreground">
        No messages yet, You can start a conversation here
      </p>
    </div>
  )
}
