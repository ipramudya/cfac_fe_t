import { Chat } from '@/components/core'
import { ChatLayout } from '@/components/layout'
import { shortenDate } from '@/utils'
import { dummyChats } from '../core/chat.dummy'

export function ChatPage() {
  return (
    <ChatLayout>
      <div className="flex h-full overflow-y-auto p-3">
        <div className="flex h-fit flex-col gap-3">
          {dummyChats.map((chat, id) => (
            <Chat
              key={`chat-${id}`}
              role={chat.role}
              date={'date' in chat ? shortenDate(chat.date) : undefined}
              isLoading={'isLoading' in chat ? chat.isLoading : undefined}
            >
              {chat.text}
            </Chat>
          ))}
        </div>
      </div>
    </ChatLayout>
  )
}
