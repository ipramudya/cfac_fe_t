import { useSession } from '@/state'
import { Message } from '@/types'
import axios from 'axios'
import { apiClient } from './client'

type MessageSuccessResponse = {
  messages: Message[]
}

type MessageErrorResponse = {
  message: string
}

export async function getMessages() {
  try {
    const session = useSession.getState().session
    if (!session) throw new Error('No session found')

    const response = await apiClient.get<MessageSuccessResponse>('/messages', {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError<MessageErrorResponse>(error) && error.response) {
      return { error: error.response.data.message }
    } else if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'An unexpected error occurred.' }
  }
}
