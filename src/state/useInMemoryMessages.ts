import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type InMemoryMessage = {
  role: 'user' | 'assistant'
  text: string
  contextId?: string
  isLoading?: boolean
  timestamp: Date
  metadata?: any
}

type InMemoryMessageState = {
  messages: InMemoryMessage[]
  addMessage: (message: InMemoryMessage) => void
  replaceMessages: (messages: InMemoryMessage[]) => void
  clearMessages: () => void
}

export const useInMemoryMessages = create<InMemoryMessageState>()(
  devtools((set, get) => ({
    messages: [],
    addMessage: (message) => set(() => ({ messages: [...get().messages, message] })),
    replaceMessages: (messages) => set(() => ({ messages })),
    clearMessages: () => set(() => ({ messages: [] })),
  })),
)
