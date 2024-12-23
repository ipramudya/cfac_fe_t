import { connectWs, disconnectWs, getWs, initializeWs } from '@/lib/ws'
import { useSession } from '@/state/useSession'
import React, { useMemo } from 'react'

export function useWs() {
  const [isConnected, setIsConnected] = React.useState(false)
  const [messages, setMessages] = React.useState<any[]>([])
  const [error, setError] = React.useState<Error | null>(null)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const session = useSession((state) => state.session)

  React.useEffect(() => {
    let socket: ReturnType<typeof getWs> | null = null

    if (session?.token) {
      try {
        initializeWs(session.token)
        connectWs()
        socket = getWs()
      } catch (error) {
        setError(error as Error)
      }
    }

    if (!socket) return

    socket.on('connect_error', (error) => {
      setError(error)
      setIsConnected(false)
    })

    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message])
      setIsProcessing(false)
    })

    socket.on('processing', () => {
      setIsProcessing(true)
    })

    socket.on('error', (error: Error) => {
      setError(error)
      setIsProcessing(false)
    })

    return () => {
      if (socket) {
        socket.off('connect_error')
        socket.off('connect')
        socket.off('message')
        socket.off('processing')
        disconnectWs()
      }
    }
  }, [session?.token])

  const sendMessage = React.useCallback((message: string) => {
    const socket = getWs()
    socket.emit('message', message)
    setIsProcessing(true)
  }, [])

  return useMemo(
    () => ({
      isConnected,
      messages,
      error,
      isProcessing,
      sendMessage,
    }),
    [error, isConnected, isProcessing, messages, sendMessage],
  )
}
