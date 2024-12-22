import { AxiosError } from 'axios'
import { apiClient } from './client'

type LoginRequest = {
  username: string
  password: string
}

type LoginSuccessResponse = {
  token: string
}

type LoginErrorResponse = {
  error: string
}

type LoginResponse = LoginSuccessResponse | LoginErrorResponse

export async function login(payload: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await apiClient.post('/login', payload)
    return {
      token: response.data.token,
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      return { error: error.response.data.message }
    }
    return { error: 'An unexpected error occurred.' }
  }
}
