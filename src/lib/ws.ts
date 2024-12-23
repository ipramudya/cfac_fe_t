import { io, Socket } from 'socket.io-client'

let socket: Socket | null = null

export function initializeWs(token: string) {
  if (!socket) {
    socket = io(import.meta.env.VITE_WS_ENDPOINT, {
      autoConnect: false,
      reconnectionDelayMax: 5000,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

export const getWs = (): Socket => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket() first.')
  }
  return socket
}

export const connectWs = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.')
  }
  socket.connect()
}

export const disconnectWs = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
