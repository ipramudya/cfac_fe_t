import { ChatHeader, ChatInput } from '@/components/core'

export function ChatLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="my-auto flex h-[95dvh] w-full flex-col overflow-hidden rounded-xl border border-divider bg-white sm:h-[90dvh]">
      <ChatHeader />
      {children}
      <ChatInput />
    </div>
  )
}
