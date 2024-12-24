import {
  useInMemoryMessages,
  useSession,
  useSocketEvent,
  wsInitialState,
  type WsState,
} from '@/state'
import React from 'react'
import { io, Socket } from 'socket.io-client'

type SocketContextValue = {
  socket: Socket | null
} & WsState

const SocketContext = React.createContext<SocketContextValue>({
  socket: null,
  ...wsInitialState,
})

function SocketProvider({ children }: React.PropsWithChildren) {
  const socketRef = React.useRef<Socket | null>(null)
  const session = useSession((state) => state.session)
  const addInMemoryMessage = useInMemoryMessages((state) => state.addMessage)
  const { dispatch, state } = useSocketEvent()

  React.useEffect(() => {
    if (socketRef.current) return

    const onConnect = () => dispatch({ type: 'CONNECT' })
    const onConnectError = (error: Error) => dispatch({ type: 'ERROR', payload: error })
    const onDisconnect = () => dispatch({ type: 'DISCONNECT' })
    const onError = (error: Error) => dispatch({ type: 'ERROR', payload: error })
    const onProcessing = () => dispatch({ type: 'PROCESSING' })
    const onMessage = (message: any) => {
      dispatch({ type: 'COMPLETE_PROCESSING' })
      addInMemoryMessage(message)
    }

    if (session) {
      const socket = io(import.meta.env.VITE_WS_ENDPOINT, {
        autoConnect: false,
        reconnectionDelayMax: 3000,
        extraHeaders: {
          Authorization: `Bearer ${session.token}`,
        },
      })

      socket.on('connect_error', onConnectError)
      socket.on('connect', onConnect)
      socket.on('disconnect', onDisconnect)
      socket.on('error', onError)
      socket.on('processing', onProcessing)
      socket.on('message', onMessage)

      socketRef.current = socket
      socket.connect()
    }

    return () => {
      socketRef.current?.off('connect_error', onConnectError)
      socketRef.current?.off('connect', onConnect)
      socketRef.current?.off('disconnect', onDisconnect)
      socketRef.current?.off('error', onError)
      socketRef.current?.off('processing', onProcessing)
      socketRef.current?.off('message', onMessage)
      socketRef.current?.disconnect()
      socketRef.current = null
    }
  }, [addInMemoryMessage, dispatch, session])

  const value: SocketContextValue = React.useMemo(
    () => ({
      socket: socketRef.current,
      ...state,
    }),
    [state],
  )

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export { SocketContext, SocketProvider }
