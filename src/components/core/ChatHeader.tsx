import { Avatar, Button } from '@nextui-org/react'
import { Menu09Icon, UserIcon } from 'hugeicons-react'

export function ChatHeader() {
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
          <h2 className="w-fit text-sm sm:text-base">@usernameone</h2>
        </div>
        <Button size="sm" isIconOnly aria-label="settings" variant="light">
          <Menu09Icon strokeWidth="2" size={16} className="text-inherit" />
        </Button>
      </div>
    </header>
  )
}