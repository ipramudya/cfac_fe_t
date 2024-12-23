import { Chat, EmptyChat } from '@/components/core'
import { useGetMessages } from '@/hooks'
import { shortenDate } from '@/utils'
import { Alert02Icon, Loading03Icon } from 'hugeicons-react'

export function ChatList() {
  const { messages, error, isLoading } = useGetMessages()

  if (isLoading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-1.5 p-3 py-3">
        <Loading03Icon strokeWidth={2} size={20} className="animate-spin text-default-400" />
        <p className="text-sm text-content4-foreground">Wait a second, getting messages...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-1.5 p-3 py-3">
        <Alert02Icon strokeWidth={2} size={20} className="text-danger-500" />
        <p className="text-sm text-danger-600">Something went wrong while getting messages !</p>
      </div>
    )
  }

  return messages.length > 0 ? (
    messages.map((message, idx) => (
      <Chat key={`message-${idx}`} role={message.role} date={shortenDate(message.timestamp)}>
        {message.text}
      </Chat>
    ))
  ) : (
    <EmptyChat />
  )
}
