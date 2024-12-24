import { SocketContext } from '@/components/core'
import React from 'react'

export function useSocket() {
  const context = React.useContext(SocketContext)

  if (!context) {
    throw new Error('useWebsocket must be used within a SocketProvider')
  }

  return context
}
