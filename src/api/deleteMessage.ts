import axios from 'axios'
import { apiClient } from './client'
import { useSession } from '@/state'

type DeleteMessageErrorResponse = {
  message: string
}

export async function deleteMessage() {
  try {
    const session = useSession.getState().session
    if (!session) throw new Error('No session found')

    const response = await apiClient.delete('/messages', {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError<DeleteMessageErrorResponse>(error) && error.response) {
      return { error: error.response.data.message }
    } else if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'An unexpected error occurred.' }
  }
}
