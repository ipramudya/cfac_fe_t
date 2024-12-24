import { useSession, useSocket } from '@/state'
import { Avatar } from '@nextui-org/react'
import { UserIcon } from 'hugeicons-react'
import { ChatHeaderSettings } from './ChatHeaderSettings'

export function ChatHeader() {
  const session = useSession((state) => state.session)

  return (
    <header className="flex flex-col">
      {/* logo */}
      <div className="bg-gray-50 p-3 sm:px-6">
        <h1 className="w-fit bg-gradient-to-t from-foreground-800 to-foreground-500 bg-clip-text text-sm font-semibold text-transparent">
          Nutritionist | Chat Bot
        </h1>
      </div>
      {/* profile */}
      <div className="flex items-center justify-between rounded-t-xl border-b border-t border-divider bg-white/10 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Avatar
            className="h-7 w-7"
            isBordered
            showFallback
            fallback={<UserIcon size={16} strokeWidth="2" className="text-default-600" />}
          />
          <div className="flex flex-col">
            <h2 className="w-fit text-sm sm:text-base">
              {session ? `@${session.user.username}` : 'N/A'}
            </h2>
            <ChatHeaderIndicator />
          </div>
        </div>
        <ChatHeaderSettings />
      </div>
    </header>
  )
}

function ChatHeaderIndicator() {
  const { isConnected } = useSocket()

  return (
    <p className="text-xs">
      {isConnected ? (
        <span className="text-success-600">Connected</span>
      ) : (
        <span className="text-danger-600">Disconnected</span>
      )}
    </p>
  )
}
