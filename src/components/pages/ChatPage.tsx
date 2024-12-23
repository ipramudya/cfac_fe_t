import { ChatList } from '@/components/core'
import { ChatLayout } from '@/components/layout'

export function ChatPage() {
  return (
    <ChatLayout>
      <div className="flex h-full overflow-y-auto p-3">
        <div className="flex h-fit w-full flex-col gap-3">
          <ChatList />
        </div>
      </div>
    </ChatLayout>
  )
}
