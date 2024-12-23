import { cn } from '@nextui-org/react'
import { SentIcon } from 'hugeicons-react'
import React from 'react'

export function ChatInput() {
  const [inputValue, setInputValue] = React.useState('')

  const handleSubmit = () => {
    console.log('inputValue', inputValue)
    setInputValue('')
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-divider bg-background p-3">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onEnter}
        placeholder="Start typing..."
        type="text"
        className="w-full bg-transparent text-sm focus:outline-none sm:text-base"
      />
      <button onClick={handleSubmit}>
        <SentIcon
          strokeWidth={2}
          className={cn(inputValue ? 'text-primary-600' : 'text-default-400')}
          size={20}
        />
      </button>
    </div>
  )
}
