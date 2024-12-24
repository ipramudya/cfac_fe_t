import { useInMemoryMessages, useSocket } from '@/state'
import { cn } from '@nextui-org/react'
import { findLastIndex } from 'es-toolkit/compat'
import { SentIcon } from 'hugeicons-react'
import React, { useEffect } from 'react'

export function ChatInput() {
  const [text, setText] = React.useState('')
  const [isAccepted, setIsAccepted] = React.useState(false)
  const { isConnected, isProcessing, socket } = useSocket()

  const inMemoryMessage = useInMemoryMessages((state) => state.messages)
  const addInMemoryMessage = useInMemoryMessages((state) => state.addMessage)
  const replaceInMemoryMessages = useInMemoryMessages((state) => state.replaceMessages)

  const handleSubmit = () => {
    if (socket) {
      const now = new Date()

      addInMemoryMessage({ role: 'user', text, timestamp: now, isLoading: true })
      socket.emit('message', { text, timestamp: now }, (isAccepted: boolean) => {
        if (isAccepted) setIsAccepted(true)
      })
      setText('')
    }
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (isAccepted) {
      const clonedInMemoryMessages = Array.from(inMemoryMessage)
      const lastUserMessageIndex = findLastIndex(clonedInMemoryMessages, {
        role: 'user',
        isLoading: true,
      })

      if (lastUserMessageIndex !== -1) {
        const lastUserMessage = clonedInMemoryMessages[lastUserMessageIndex]
        lastUserMessage.isLoading = false
        replaceInMemoryMessages(clonedInMemoryMessages)
      }

      setIsAccepted(false)
    }
  }, [isAccepted, inMemoryMessage, replaceInMemoryMessages])

  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-divider bg-background px-3 py-4',
        !isConnected && 'opacity-50',
      )}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onEnter}
        placeholder="What are you thinking about nutritions..."
        type="text"
        className="w-full bg-transparent text-sm focus:outline-none sm:text-base"
        disabled={!isConnected || isProcessing}
      />
      <button onClick={handleSubmit} disabled={!isConnected || isProcessing}>
        <SentIcon
          strokeWidth={2}
          className={cn(text ? 'text-primary-600' : 'text-default-400')}
          size={20}
        />
      </button>
    </div>
  )
}
