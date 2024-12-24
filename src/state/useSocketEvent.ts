import React from 'react'

export type WsState = {
  isConnected: boolean
  isProcessing: boolean
  error: Error | null
}

type WsConnectAction = {
  type: 'CONNECT'
}

type WsDisconnectAction = {
  type: 'DISCONNECT'
}

type WsErrorAction = {
  type: 'ERROR'
  payload: Error
}

type WsProcessingAction = {
  type: 'PROCESSING'
}

type WsProcessingCompleteAction = {
  type: 'COMPLETE_PROCESSING'
}

type WsAction =
  | WsConnectAction
  | WsDisconnectAction
  | WsErrorAction
  | WsProcessingAction
  | WsProcessingCompleteAction

export const wsInitialState: WsState = {
  isConnected: false,
  isProcessing: false,
  error: null,
}

const wsReducer = (state: WsState, action: WsAction): WsState => {
  switch (action.type) {
    case 'CONNECT':
      return { ...state, isConnected: true }
    case 'PROCESSING':
      return { ...state, isProcessing: true }
    case 'COMPLETE_PROCESSING':
      return { ...state, isProcessing: false }
    case 'DISCONNECT':
      return wsInitialState
    case 'ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export function useSocketEvent() {
  const [state, dispatch] = React.useReducer(wsReducer, wsInitialState)
  return { state, dispatch }
}
