import { SentIcon } from 'hugeicons-react'

export function ChatInput() {
  return (
    <div className="flex items-center justify-between border-t border-divider bg-background p-3">
      <input
        placeholder="Start typing..."
        type="text"
        className="w-full bg-transparent text-sm focus:outline-none sm:text-base"
      />
      <SentIcon strokeWidth={2} className="text-default-400" size={20} />
    </div>
  )
}
