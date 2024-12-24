import { useSession } from '@/state'
import axios from 'axios'
import { apiClient } from './client'

type ChangePasswordRequest = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

type ChangePasswordErrorResponse = {
  message: string
}

export async function changePassword(payload: ChangePasswordRequest) {
  try {
    const session = useSession.getState().session
    if (!session) throw new Error('No session found')

    await apiClient.post('/change-password', payload, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    })
    return { error: undefined }
  } catch (error: unknown) {
    if (axios.isAxiosError<ChangePasswordErrorResponse>(error) && error.response) {
      return { error: error.response.data.message }
    } else if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'An unexpected error occurred.' }
  }
}
