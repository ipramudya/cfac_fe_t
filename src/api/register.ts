import axios from 'axios'
import { apiClient } from './client'

type RegisterRequest = {
  username: string
  password: string
  confirmPassword: string
}

type RegisterErrorResponse = {
  message: string
}

export async function register(payload: RegisterRequest) {
  try {
    await apiClient.post('/register', payload)
    return { error: undefined }
  } catch (error: unknown) {
    if (axios.isAxiosError<RegisterErrorResponse>(error) && error.response) {
      return { error: error.response.data.message }
    }
    return { error: 'An unexpected error occurred.' }
  }
}
