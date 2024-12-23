import { getMessages } from '@/api'
import { Message } from '@/types'
import React, { useEffect, useMemo } from 'react'

export function useGetMessages() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  useEffect(() => {
    void (async () => {
      setIsLoading(true)

      const res = await getMessages()
      if ('error' in res) {
        setErrorMessage(res.error)
      } else {
        setMessages(res.messages)
      }

      setIsLoading(false)
    })()
  }, [])

  return useMemo(
    () => ({
      messages,
      error: errorMessage,
      isLoading,
    }),
    [errorMessage, isLoading, messages],
  )
}
