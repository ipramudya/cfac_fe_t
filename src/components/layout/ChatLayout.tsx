import { ChatHeader, ChatInput, SocketProvider } from '@/components/core'

export function ChatLayout({ children }: React.PropsWithChildren) {
  return (
    <SocketProvider>
      <div className="my-auto flex h-[95dvh] w-full flex-col overflow-hidden rounded-xl border border-divider bg-white">
        <ChatHeader />
        {children}
        <ChatInput />
      </div>
    </SocketProvider>
  )
}
