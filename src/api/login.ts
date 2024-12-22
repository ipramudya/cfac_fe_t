import axios from 'axios'
import { apiClient } from './client'

type LoginRequest = {
  username: string
  password: string
}

type LoginSuccessResponse = {
  token: string
  user: {
    id: string
    username: string
    createdAt: Date
  }
}

type LoginErrorResponse = {
  message: string
}

export async function login(payload: LoginRequest) {
  try {
    const response = await apiClient.post<LoginSuccessResponse>('/login', payload)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError<LoginErrorResponse>(error) && error.response) {
      return { error: error.response.data.message }
    }
    return { error: 'An unexpected error occurred.' }
  }
}
